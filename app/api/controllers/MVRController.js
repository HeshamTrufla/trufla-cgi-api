/**
 * MvrController
 *
 * @description :: Server-side logic for managing mvrs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var unhandledError = _.find(sails.config.cgi.MVR.MESSAGES, (msg) => msg.INTERNAL_CODE === 'UNHANDLED_ERROR');

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

        // filter params.
        var licenceNumber =  params.DriverLicenceNumber;

        // make sure we have the licence number.
        if (!licenceNumber) return res.badRequest(new Error('licence number not found!'));

        // find MVR Document in redis cache.
        MVRService.findOneFromCache(licenceNumber)
            // handle returned MVR Document Reference if found in the cache memory.
            .then((mvrRef) => {
                if (mvrRef) {
                    // get from DB
                    return MVRService.findOneFromDB({ _id: mvrRef.MVR_ID });
                }
                else {
                    // get From CGI
                    return MVRService.findOneFromCGIAndSave(params);
                }
            })
            // handle returned MVR Document either from the database or the CGI webservice.
            .then((mvrDoc) => {
                if (!mvrDoc) return res.serverError({ error_code: unhandledError.INTERNAL_CODE, message: unhandledError.TEXT });

                // check if the document is ready or not.
                if (!mvrDoc.IsReady && params.Callback) {
                    /**
                     * mvr document is not ready, so check 
                     * if we already has the requested 
                     * client information or not.
                     */
                    var clientInfo = _.find(mvrDoc.Clients, (client) => client.Callback == params.Callback);
                    if (clientInfo) return res.ok(mvrDoc);
                    // add client to the Document Clients.
                    MVRService.addClientToDoc(mvrDoc._id, {
                        //ApiKey: '',
                        Callback: params.Callback
                    })
                    .then(() => res.ok(mvrDoc))
                    .catch((err) => {
                        // log the error and then send the document to the client anyway.
                        sails.log.error('error saving new client => ' + params.Callback + ' <= information into db document ' + mvrDoc._id, err);
                        res.ok(mvrDoc);
                    });
                }
                else {
                    res.ok(mvrDoc);
                }

            })
            .catch((err) => {
                sails.log.error(err);

                if (err.HTTP_STATUS) {
                    switch (err.HTTP_STATUS) {
                        case 404:
                            res.notFound({ error_code: err.INTERNAL_CODE, message: err.TEXT });
                            break;
                        default:
                            res.serverError({ error_code: err.INTERNAL_CODE, message: err.TEXT });    
                    }
                }
                else {
                    res.serverError({ error_code: unhandledError.INTERNAL_CODE, message: unhandledError.TEXT });
                }

            });

    }

};