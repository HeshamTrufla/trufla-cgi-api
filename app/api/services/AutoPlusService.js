
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
    }
};