
var mvr = require('./machinepack-autoplus');
var Promise = require('bluebird');


module.exports = {

    findByLicenceNumber: (args) => {
        // TODO check if the autoplus is in redis

        return new Promise((resolve, reject) => {

            args.Url = sails.config.cgi.autoPlusUrl;
            args.UserName = sails.config.cgi.userName;
            args.Password = sails.config.cgi.password;
            args.SponsorSubscriberID = '';

            mvr.GetDCHUsingLicence(args).exec({

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