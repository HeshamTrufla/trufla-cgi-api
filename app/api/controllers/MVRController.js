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