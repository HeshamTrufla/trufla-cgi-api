
module.exports = {

    findByLicenceNumber: (req, res) => {
        
        /** 
         testing redis 
        **/

        // AutoPlusRedis.create({licence: 'mdsfdsfydddlic', autoPlusId: 'myautdswddddfsdfoid'}).exec( function(err, records) { 
        //     if (err) console.log(err);
        //     console.log(records);
            
        // });
        
        // AutoPlusRedis.findOne({licence: 'mdsfdsfydddlic'}).exec( function(err, result) { 
        //     if (err) console.log(err);
        //     console.log(result);
            
        // });
        
        // TODO validate params

        AutoPlusService.findByLicenceNumber(req.params.all())

            .then((autoPlus) => {

                if (!autoPlus) {
                    res.notFound('AutoPlus can\'t be found');
                } else {

                    return autoPlus;
                }

            })
            .then((autoPlus) => {
                
                // TODO insert autoPlus in mongo db then send it to user

                res.ok(autoPlus);

            })
            .catch((err) => {
                res.serverError(err);
            });
    }

};

