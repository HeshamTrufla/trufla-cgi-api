const autoPlusMachine = require('./machinepack-autoplus');
const cgiUrl = sails.config.cgi.AutoPlus.URL;
const cgiUserName = sails.config.cgi.AutoPlus.USER_NAME;
const cgiPassword = sails.config.cgi.AutoPlus.PASSWORD;

module.exports = {

    createInMongo: (autoPlus) => {
        return db.AutoPlus.create(autoPlus);
    },

    updateInMongo: (autoPlus, autoPlusId) => {
        return db.AutoPlus.findOneAndUpdate({'_id': autoPlusId}, autoPlus);
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
                    resolve(result);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    },

    findOneFromCGIAndSave: function (params) {

        var _autoPlus;
        // Licence not found so we are getting autoPlus from CGI
        return this.findOneFromCGI(params)
            .then((autoPlus) => ResHandlerService.AutoPlus(autoPlus)) // validate incoming A+ Document.
            .then((autoPlus) => {
                var autoPlusDoc = _.get(autoPlus.doc, 'GetDCHUsingLicenceResult.DriverClaimHistoryGoldDS');
                var data = {
                    'LicenceNumber': params.LicenceNumber,
                    'DriverClaimHistoryGoldDS': autoPlusDoc,
                    'raw': autoPlus.doc.raw
                };

                // Insert autoPlus in mongodb
                return this.createInMongo(data);
            })
            .then((autoPlus) => {

                _autoPlus = autoPlus;

                // Create reference in redis
                var autoPlusRef = {'LicenceNumber': autoPlus.LicenceNumber, 'autoPlusId': autoPlus._id.toString()}

                return this.createInRedis(autoPlusRef);
            })
            .then(() => _autoPlus);

    },

    findOneFromCGIAndupdate: function (params, autoPlusId) {
        // Licence not found so we are getting autoPlus from CGI
        return this.findOneFromCGI(params)
            .then((autoPlus) => ResHandlerService.AutoPlus(autoPlus)) // validate incoming A+ Document.
            .then((autoPlus) => {
                var autoPlusDoc = _.get(autoPlus.doc, 'GetDCHUsingLicenceResult.DriverClaimHistoryGoldDS');
                var data = {
                    'LicenceNumber': params.LicenceNumber,
                    'DriverClaimHistoryGoldDS': autoPlusDoc,
                    'raw': autoPlus.raw
                };

                // Insert autoPlus in mongodb
                return this.updateInMongo(data, autoPlusId);
            })
            .then((autoPlus) => autoPlus);

    }
};