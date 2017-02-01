
const autoPlusMachine = require('./machinepack-autoplus');


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

        return new Promise((resolve, reject) => {

            // adding config params
            params.Url = sails.config.cgi.autoPlusUrl;
            params.UserName = sails.config.cgi.userName;
            params.Password = sails.config.cgi.password;
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

    findOneFromCGIAndSave : function (params) {
        var _autoPlus;

        // Licence not found so we are getting autoPlus from CGI
        return this.findOneFromCGI(params)
            .then((autoPlus) => {
                // var x = JSON.stringify(autoPlus);
                // console.log(`CGI autoplus: ${x}`);
                                console.log(JSON.stringify(autoPlus));

                if (!autoPlus) {
                    var err = new Error('no AutoPlus response returned!');
                    err.status = 500;
                    throw err;
                }
                if (!autoPlus.GetDCHUsingLicenceResult.DriverClaimHistoryGoldDS.PolicyBaseInfoDT) {
                    var err = new Error('returned AutoPlus Document doesn\'t contain a result!');
                    err.status = 404;
                    throw err;
                }
                    
                var data = {
                    'LicenceNumber': params.LicenceNumber,
                    'DriverClaimHistoryGoldDS': autoPlus.GetDCHUsingLicenceResult.DriverClaimHistoryGoldDS
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