const autoPlusMachine = require('./machinepack-autoplus');
const cgiUrl = sails.config.cgi.AutoPlus.URL;
const cgiUserName = sails.config.cgi.Credentials.USER_NAME;
const cgiPassword = sails.config.cgi.Credentials.PASSWORD;
const cgiFederatedUserName = sails.config.cgi.FederatedCredentials.USER_NAME;
const cgiFederatedPassword = sails.config.cgi.FederatedCredentials.PASSWORD;

module.exports = {

  createInMongo: (autoPlus) => {
    return db.AutoPlus.create(autoPlus);
  },

  updateInMongo: (autoPlus, autoPlusId) => {
    return db.AutoPlus.findOneAndUpdate({'_id': autoPlusId}, autoPlus);
  },

  createInRedis: (autoPlusRef) => {
    return AutoPlusRedis.create(autoPlusRef);
  },

  findOneFromCach: (licence, provinceCode) => {
    return AutoPlusRedis.findOne({LicenceNumber: licence, ProvinceCode: provinceCode});
  },

  findOneFromDB: (autoPlusId) => {
    return db.AutoPlus.findById(autoPlusId);
  },

  findOneFromCGI: (params, apiKey) => {
    // check if the client sent the province code.
    if (!params.ProvinceCode)
      throw ResHandlerService.getMessage('PROVINCE_CODE_REQUIRED', true);

    return new Promise((resolve, reject) => {

      // adding config params
      params.Url = cgiUrl;
      params.UserName = cgiUserName;
      params.Password = cgiPassword;
      params.FederatedUserName = cgiFederatedUserName;
      params.FederatedPassword = cgiFederatedPassword;
      //params.SponsorSubscriberID = '101236';
      var selectedSponsor = CostDistributionService.selectSponsor(apiKey,'autoplus');
      sails.log.info("Selected Sponsor: ", selectedSponsor.name);
      params.SponsorSubscriberID = selectedSponsor.id;//'100410';

      // calling CGI using machinepack to get autoPlus
      autoPlusMachine.GetDCHUsingLicence(params).exec({

        success: (result) => {
          apiKey.totalCost = (apiKey.totalCost ? apiKey.totalCost : 0) + sails.config.cgi.AutoPlus.cost;
          selectedSponsor.totalCost = (selectedSponsor.totalCost ? selectedSponsor.totalCost : 0) + sails.config.cgi.AutoPlus.cost;
          db.ApiKey.update({_id: apiKey._id}, {
            totalCost: apiKey.totalCost,
            sponsors: apiKey.sponsors
          }).then((updatedApiKye) => {
            sails.log.info("Updated API Key: ", updatedApiKye)
          });
          resolve(result);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  },

  findOneFromCGIAndSave: function (params, apiKey) {

    var _autoPlus;
    // Licence not found so we are getting autoPlus from CGI
    return this.findOneFromCGI(params, apiKey)
      .then((autoPlus) => ResHandlerService.AutoPlus(autoPlus)) // validate incoming A+ Document.
      .then((autoPlus) => {
        var autoPlusDoc = _.get(autoPlus.doc, 'GetDCHUsingLicenceResult.DriverClaimHistoryGoldDS');
        var data = {
          'LicenceNumber': params.LicenceNumber,
          'ProvinceCode': params.ProvinceCode,
          'DriverClaimHistoryGoldDS': autoPlusDoc,
          'raw': autoPlus.doc.raw
        };

        // Insert autoPlus in mongodb
        return this.createInMongo(data);
      })
      .then((autoPlus) => {

        _autoPlus = autoPlus;

        // Create reference in redis
        var autoPlusRef = {
          'LicenceNumber': autoPlus.LicenceNumber,
          'ProvinceCode': autoPlus.ProvinceCode,
          'autoPlusId': autoPlus._id.toString()
        }

        return this.createInRedis(autoPlusRef);
      })
      .then(() => _autoPlus);

  },

  findOneFromCGIAndupdate: function (params, autoPlusId, apiKey) {
    // Licence not found so we are getting autoPlus from CGI
    return this.findOneFromCGI(params, apiKey)
      .then((autoPlus) => ResHandlerService.AutoPlus(autoPlus)) // validate incoming A+ Document.
      .then((autoPlus) => {
        var autoPlusDoc = _.get(autoPlus.doc, 'GetDCHUsingLicenceResult.DriverClaimHistoryGoldDS');
        var data = {
          'LicenceNumber': params.LicenceNumber,
          'DriverClaimHistoryGoldDS': autoPlusDoc,
          'raw': autoPlus.doc.raw
        };

        // Insert autoPlus in mongodb
        return this.updateInMongo(data, autoPlusId);
      })
      .then((autoPlus) => autoPlus);

  }
};
