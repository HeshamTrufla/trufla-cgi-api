/**
 * MvrController
 *
 * @description :: Server-side logic for managing mvrs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    /**
     * Find MVR Document.
     * 1. find MVR Document in redis cache.
     * 2. if found get the Document from MongoDB and skip to step 6.
     * 3. otherwise, get MVR Document from CGI webservice.
     * 4. save to DB.
     * 5. add reference to Redis.
     * 6. return to MVR Document.
     */
    findOne: (req, res) => {

        // get all params.
        var params = req.allParams();
        var filteredParams = {};

        // filter params.
        var filteredParams =  _.pick(params, ['LicenceNumber']);

        // make sure we have the licence number.
        if (!filteredParams || !filteredParams.licenceNumber) return res.badRequest(new Error('licence number not found!'));

        // find MVR Document in redis cache.
        MVRService.findOneFromCache(filteredParams)
            // handle returned MVR Document Reference if found in the cache memory.
            .then((mvrRef) => {
                if (mvrRef) {
                    // get from DB
                    return MVRService.findOneFromDB({ _id: mvrRef.MVR_ID });
                }
                else {
                    // get From CGI
                    return findOneFromCGIAndSave(params);
                }
            })
            // handle returned MVR Document either from the database or the CGI webservice.
            .then((mvrDoc) => {
                if (mvrDoc) {
                    res.ok(mvrDoc);
                }
                else {
                    res.notFound();
                }
            })
            .catch((err) => {
                // TODO: handle cgi errors.
                res.serverError(err);
            });

    }

};

/**
 * this function will make async promise based calls to the MVRService
 * to get the MVR Document from CGI, and then insert the document in MonogoDB,
 * and put a reference for the MVR Document in the cache memory 'Redis'.
 */
function findOneFromCGIAndSave (reqParams) {
    return MVRService.findOneFromCGI(reqParams)
        .then((mvrDoc) => {
            // set IsReady flag.
            mvrDoc.IsReady = mvrDoc.DataFormatAbstractDT ? true : false;
            // set IsDelivered flag.
            mvrDoc.IsDelivered = mvrDoc.IsReady;
            // set Callback URL.
            mvrDoc.Callback = reqParams.Callback;
            // save in MongoDB.
            return MVRService.createInDB(mvrDoc);
        })
        .then((mvrFromDB) => MVRService.createInCache({ LicenceNumber: mvrFromDB.mvrFromDB, MVR_ID: mvrFromDB.MVR_ID }));
}