
module.exports = {

    findOneByLicence: (req, res) => {
        
        var params = req.params.all();


        // Check if the autoPlus is available in redisautoPlusRef
        AutoPlusService.findOneFromCach(params.LicenceNumber)

            .then((autoPlusRef) => {

                if (autoPlusRef) {
                    // Found licence in redis and getting autoPlus from mongodb
                    return AutoPlusService.findOneFromDB(autoPlusRef.autoPlusId);
                } else {
                    // Licence not found so we are getting autoPlus from CGI
                    return AutoPlusService.findOneFromCGIAndSave(params);
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

    }

};



