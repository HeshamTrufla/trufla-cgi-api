
module.exports = {

    findOneByLicence: (req, res) => {
        
        // TODO validate params

        var params = req.params.all();

        if (!params.LicenceNumber) {
            res.badRequest('You must specify a LicenceNumber.');
        }

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
                if (!autoPlus) res.notFound();

                // Return autoPlus to user
                res.ok(autoPlus);
            })
            .catch((err) => {
                switch (err.status) {
                    case 404:
                        res.notFound(err);
                        break;
                    case 400:
                        res.badRequest(err);
                        break;
                    default:
                        res.serverError(err);
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



