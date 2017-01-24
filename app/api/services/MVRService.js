const MVRMachine = require('./machinepack-mvr');
const cgiUrl = sails.config.cgi.MVR.URL;
const cgiUserName = sails.config.cgi.MVR.USER_NAME;
const cgiPassword = sails.config.cgi.MVR.PASSWORD;

module.exports = {
    
    // get MVR Document from Cach.
    findOneFromCache: function (reqParams) {
        return MVRRedis.findOne(reqParams);
    },

    // get MVR Document from DB.
    findOneFromDB: function (reqParams) {
        return db.MVR.findOne(reqParams);
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
        return db.MVR.create(mvrDoc);
    },

    // save reference to the requested MVR Document in Redis Cache.
    createInCache: function (docInfo) {
        return MVRRedis.create(docInfo);
    },

    /**
     * this function will make async promise based calls to the MVRService
     * to get the MVR Document from CGI, and then insert the document in MonogoDB,
     * and put a reference for the MVR Document in the cache memory 'Redis'.
     */
    findOneFromCGIAndSave: function (reqParams) {
        var _mvrFromDB = null;

        return this.findOneFromCGI(reqParams)
            .then((mvrDoc) => {

                // validate incoming MVR Document.
                if (!mvrDoc) throw new Error('no mvr response returned!');
                if (!mvrDoc.SubmitRequestResult || !mvrDoc.SubmitRequestResult.MVRRequestResponseDS) throw new Error('returned MVR Document doesn\'t contain a result!');

                var requestResult = mvrDoc.SubmitRequestResult.MVRRequestResponseDS;

                var dbDoc = {
                    DriverLicenceNumber: reqParams.DriverLicenceNumber,
                    MVRRequestResponseDS: requestResult,
                    Callback: reqParams.Callback,
                    IsReady: requestResult.DataFormatAbstractDT ? true : false,
                    IsDelivered: requestResult.DataFormatAbstractDT ? true : false
                };

                return this.createInDB(dbDoc);

            })
            .then((mvrFromDB) => {
                _mvrFromDB = mvrFromDB; 
                return this.createInCache({ DriverLicenceNumber: mvrFromDB.DriverLicenceNumber, MVR_ID: mvrFromDB._id.toString() });
            })
            .then(() => _mvrFromDB);
    }

};