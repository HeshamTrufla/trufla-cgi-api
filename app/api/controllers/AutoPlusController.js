module.exports = {

    findOneByLicence: (req, res) => {

        var params = req.params.all();


        // Check if the autoPlus is available in redisautoPlusRef
        AutoPlusService.findOneFromCach(params.LicenceNumber)
            .then((autoPlusRef) => {
                var overrideCache = (params.overrideCache === 'true');
                if (autoPlusRef) {
                    if (overrideCache) {
                        // Found licence in redis and getting autoPlus from mongodb
                        return AutoPlusService.findOneFromCGIAndupdate(params, autoPlusRef.autoPlusId, req.apiKey);
                    }
                    else {
                        return AutoPlusService.findOneFromDB(autoPlusRef.autoPlusId);
                    }
                } else {
                    // Licence not found so we are getting autoPlus from CGI
                    return AutoPlusService.findOneFromCGIAndSave(params, req.apiKey);
                }
            })
            .then((autoPlus) => {
                // AutoPlus not found
                if (!autoPlus) return res.serverError(ResHandlerService.errorObject('UNHANDLED_ERROR', true));

                // Return autoPlus to user
                res.ok(autoPlus);
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

        AutoPlusService.findOneFromDB(params.id)
            .then((autoPlusDoc) => {
                if (!autoPlusDoc) return res.serverError(ResHandlerService.errorObject('UNHANDLED_ERROR', true));

                res.ok(autoPlusDoc);

            })
            .catch((err) => {
                sails.log.error(err);
                res.serverError(ResHandlerService.errorObject('UNHANDLED_ERROR', true));
            });

    },

    viewOneByLicence: (req, res) => {

        var params = req.params.all();


        // Check if the autoPlus is available in redisautoPlusRef
        AutoPlusService.findOneFromCach(params.LicenceNumber)

            .then((autoPlusRef) => {

                var overrideCache = (params.overrideCache === 'true');
                if (autoPlusRef) {
                    if (overrideCache) {
                        // Found licence in redis and getting autoPlus from mongodb
                        return AutoPlusService.findOneFromCGIAndupdate(params, autoPlusRef.autoPlusId, req.apiKey);
                    }
                    else {
                        return AutoPlusService.findOneFromDB(autoPlusRef.autoPlusId);
                    }
                } else {
                    // Licence not found so we are getting autoPlus from CGI
                    return AutoPlusService.findOneFromCGIAndSave(params, req.apiKey);
                }
            })
            .then((autoPlus) => {
                // AutoPlus not found
                if (!autoPlus || !autoPlus.raw) return res.serverError(ResHandlerService.errorObject('UNHANDLED_ERROR', true));
                var DriverClaimHistoryGoldDS = autoPlus.raw.replace(/<DriverClaimHistoryGoldDS(.*?)>/igm, "<DriverClaimHistoryGoldDS>").match(/<DriverClaimHistoryGoldDS(.*?)<\/DriverClaimHistoryGoldDS>/igm);
                if (DriverClaimHistoryGoldDS && DriverClaimHistoryGoldDS.length) {
                    var autoplusXML = "<?xml version='1.0' encoding='utf-8'?><?xml-stylesheet type='text/xsl' href='/styles/AutoPlusPrintFormat.xslt'?>" + DriverClaimHistoryGoldDS[0];
                    res.type('text/xml');
                    return res.send(autoplusXML);
                }
                //console.log("XML Matches: ",autoplusXML);
                // Return autoPlus to user
                return res.notFound();
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

};



