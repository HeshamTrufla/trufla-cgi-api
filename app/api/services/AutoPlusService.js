
const autoPlusMachine = require('./machinepack-autoplus');
const cgiUrl = sails.config.cgi.AutoPlus.URL;
const cgiUserName = sails.config.cgi.AutoPlus.USER_NAME;
const cgiPassword = sails.config.cgi.AutoPlus.PASSWORD;

module.exports = {

    createInMongo: (autoPlus) => {
        return db.AutoPlus.create(autoPlus);
    },

    createInRedis: (autoPlusRef) => {
        return AutoPlusRedis.create(autoPlusRef);
    },

    findOneFromCach: (licence) => {
        return AutoPlusRedis.findOne({LicenceNumber: licence});
    },

    findOneFromDB: (autoPlusId) => {
        return db.AutoPlus.findById(autoPlusId);
    },
    
    findOneFromCGI: (params) => {

        // check if the client sent the province code.
        if (!params.LicenceProvinceCode)
            throw ResHandlerService.getMessage('PROVINCE_CODE_REQUIRED', true);

        return new Promise((resolve, reject) => {
            
            // adding config params
            params.Url = cgiUrl;
            params.UserName = cgiUserName;
            params.Password = cgiPassword;
            params.SponsorSubscriberID = '';

            // calling CGI using machinepack to get autoPlus
            autoPlusMachine.GetDCHUsingLicence(params).exec({

                success: (result) => {
                    console.log('response: ' + JSON.stringify(result));
                    resolve(result);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    },

    findOneFromCGIAndSave : function (params) {

        var _autoPlus;
        // Licence not found so we are getting autoPlus from CGI
        return this.findOneFromCGI(params)
            .then((autoPlus) => ResHandlerService.AutoPlus(autoPlus)) // validate incoming MVR Document.
            .then((autoPlus) => {
                var autoPlusDoc = _.get(autoPlus.doc, 'GetDCHUsingLicenceResult.DriverClaimHistoryGoldDS');
                var data = {
                    'LicenceNumber': params.LicenceNumber,
                    'DriverClaimHistoryGoldDS': autoPlusDoc
                };

                // Insert autoPlus in mongodb
                return this.createInMongo(data);
            })
            .then ((autoPlus)=> {

                _autoPlus = autoPlus;

                // Create reference in redis
                var autoPlusRef = { 'LicenceNumber': autoPlus.LicenceNumber, 'autoPlusId': autoPlus._id.toString() }

                return this.createInRedis(autoPlusRef);
            })
            .then(() => _autoPlus);

    }
};