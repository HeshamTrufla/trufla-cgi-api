
module.exports = {

    findOne: (req, res) => {
        
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
                    return findOneFromCGIAndSave(params);
                }
                
            })
            .then((autoPlus) => {
                // AutoPlus not found
                if (!autoPlus) res.notFound();

                // Return autoPlus to user
                res.ok(autoPlus);

            })
            .catch((err) => {
                res.serverError(err);
            });
    }

};


function findOneFromCGIAndSave (params) {

    // Licence not found so we are getting autoPlus from CGI
    return AutoPlusService.findOneFromCGI(params)
        .then((autoPlus) => {

            var data = {
                'LicenceNumber': params.LicenceNumber,
                'DriverClaimHistoryGoldDS': autoPlus.GetDCHUsingLicenceResult.DriverClaimHistoryGoldDS
            };

            // Insert autoPlus in mongodb
            return AutoPlusService.createInMongo(data);
        })
        .then ((autoPlus)=> {
            
            // Create reference in redis
            var autoPlusRef = { 'LicenceNumber': autoPlus.LicenceNumber, 'autoPlusId': autoPlus._id.toString() }

            AutoPlusService.createInRedis(autoPlusRef)
                .then((autoPlusRef)=>{})

            return autoPlus;
        })
}
