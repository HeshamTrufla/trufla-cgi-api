const MVRMachine = require('./machinepack-mvr');
const cgiUrl = sails.config.cgi.MVR.URL;
const cgiUserName = sails.config.cgi.MVR.USER_NAME;
const cgiPassword = sails.config.cgi.MVR.PASSWORD;

module.exports = {
    
    // get MVR Document from Cach.
    findOneFromCach: function (reqParams) {
        return MVRRedis.findOne(reqParams);
    },

    // get MVR Document from DB.
    findOneFromDB: function (reqParams) {
        return MVR.findOne(reqParams);
    },

    // get MVR Document from CGI.
    findOneFromCGI: function (reqParams) {
        // set request headers.
        reqParams.Url = cgiUrl;
        reqParams.UserName = cgiUserName;
        reqParams.Password = cgiPassword;
        // TODO: handle adding sponsor id.
        //reqParams.SponsorSubscriberID = '';

        // make a call to cgi - mvr service.
        return new Promise((resolve, reject) => {
            MVRMachine.RequestMVR(reqParams)
                .exec({
                    success: (result) => {
                        resolve(result);
                    },
                    error: (err) => {
                        reject(err);
                    }
                });
        });
    },

    // save requested MVR document in MongoDB.
    createInDB: function (mvrDoc) {
        return MVR.create(mvrDoc);
    },

    // save reference to the requested MVR Document in Redis Cache.
    createInCache: function (docInfo) {
        return MVRRedis.create(docInfo);
    }

};