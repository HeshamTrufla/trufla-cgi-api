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
    findOneByLicence: function (req, res) {

        // get all params.
        var params = req.allParams();
        if (params.Callback)
            params.Callback = req.query.Callback;

        // filter params.
        var licenceNumber =  params.LicenceNumber;
        var provinceCode =  params.ProvinceCode;

        // find MVR Document in redis cache.
        MVRService.findOneFromCache(licenceNumber, provinceCode)
            // handle returned MVR Document Reference if found in the cache memory.
            .then((mvrRef) => {
                if (mvrRef) {
                    // get from DB
                    return MVRService.findOneFromDB({ _id: mvrRef.MVR_ID });
                }
                else {
                    // get From CGI
                    return MVRService.findOneFromCGIAndSave(params, req.apiKey);
                }
            })
            // handle returned MVR Document either from the database or the CGI webservice.
            .then((mvrDoc) => {
                if (!mvrDoc) return res.serverError(ResHandlerService.errorObject('UNHANDLED_ERROR', true));

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
                            res.notFound(ResHandlerService.errorObject(err.INTERNAL_CODE, true));
                            break;
                        case 400:
                            res.badRequest(ResHandlerService.errorObject(err.INTERNAL_CODE, true));
                            break;
                        case 403:
                            res.forbidden(ResHandlerService.errorObject(err.INTERNAL_CODE, true));
                            break;
                        default:
                            res.serverError(ResHandlerService.errorObject(err.INTERNAL_CODE, true));
                    }
                }
                else {
                    res.serverError(ResHandlerService.errorObject('UNHANDLED_ERROR', true));
                }

            });

    },

    findOneById: function (req, res) {
        // get all params.
        var params = req.allParams();

        MVRService.findOneFromDB({ _id: params.id })
            .then((mvrDoc) => {
                if (!mvrDoc) return res.serverError(ResHandlerService.errorObject('UNHANDLED_ERROR', true));

                res.ok(mvrDoc);

            })
            .catch((err) => {
                sails.log.error(err);
                res.serverError(ResHandlerService.errorObject('UNHANDLED_ERROR', true));
            });

    },

    viewOneByLicense: function (req,res){
        {

            // get all params.
            var params = req.allParams();
            if (params.Callback)
                params.Callback = req.query.Callback;
                
            // filter params.
            var licenceNumber =  params.LicenceNumber;
            var provinceCode =  params.ProvinceCode;

            // find MVR Document in redis cache.
            MVRService.findOneFromCache(licenceNumber, provinceCode)
            // handle returned MVR Document Reference if found in the cache memory.
                .then((mvrRef) => {
                    if (mvrRef) {
                        // get from DB
                        return MVRService.findOneFromDB({ _id: mvrRef.MVR_ID });
                    }
                    else {
                        // get From CGI
                        return MVRService.findOneFromCGIAndSave(params, req.apiKey);
                    }
                })
                // handle returned MVR Document either from the database or the CGI webservice.
                .then((mvrDoc) => {
                    if (!mvrDoc) return res.serverError(ResHandlerService.errorObject('UNHANDLED_ERROR', true));

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
                            .then(() => { res.type('text/html');
                            return res.send("<div>MVR Not Ready Yet</div>");})
                            .catch((err) => {
                                // log the error and then send the document to the client anyway.
                                sails.log.error('error saving new client => ' + params.Callback + ' <= information into db document ' + mvrDoc._id, err);
                                res.ok(mvrDoc);
                            });
                    }
                    else {
                        var MVRRequestResponseDS = mvrDoc.raw.replace(/<MVRRequestResponseDS(.*?)>/igm, "<MVRRequestResponseDS>").match(/<MVRRequestResponseDS(.*?)<\/MVRRequestResponseDS>/igm);
                        if (MVRRequestResponseDS && MVRRequestResponseDS.length) {
                            var mvrXML = "<?xml version='1.0' encoding='utf-8'?><?xml-stylesheet type='text/xsl' href='/styles/mvrabstract.xsl'?>" + MVRRequestResponseDS[0];
                            res.type('text/xml');
                            return res.send(mvrXML);
                        }
                    }

                })
                .catch((err) => {
                    sails.log.error(err);

                    if (err.HTTP_STATUS) {
                        switch (err.HTTP_STATUS) {
                            case 404:
                                res.notFound(ResHandlerService.errorObject(err.INTERNAL_CODE, true));
                                break;
                            case 400:
                                res.badRequest(ResHandlerService.errorObject(err.INTERNAL_CODE, true));
                                break;
                            case 403:
                                res.forbidden(ResHandlerService.errorObject(err.INTERNAL_CODE, true));
                                break;
                            default:
                                res.serverError(ResHandlerService.errorObject(err.INTERNAL_CODE, true));
                        }
                    }
                    else {
                        res.serverError(ResHandlerService.errorObject('UNHANDLED_ERROR', true));
                    }

                });

        }
    }

};
