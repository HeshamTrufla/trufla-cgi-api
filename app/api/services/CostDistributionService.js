/**
 * Created by wasee on 2017-02-24.
 */
module.exports = {

  calculateDeviation: function (apiKey, requestType) {
    sails.log.info("requestType: ",requestType," ",typeof requestType);
    var filteredSponsors = [];
    _.forEach(apiKey.sponsors, function (sponsor) {
      if(sponsor[requestType]){
        filteredSponsors.push(sponsor);
        var currentPercent = (apiKey.totalCost > 0 ? (sponsor.totalCost / apiKey.totalCost) : 0);
        sponsor.deviation = Math.abs(sponsor.percent - currentPercent);
      }


    });

    sails.log.info("Filtered Sponsors: ",filteredSponsors);
    apiKey.sponsors = _.sortBy(filteredSponsors, (sponsor) => {
      return sponsor.deviation
    });
    _.forEach(apiKey.sponsors, function (sponsor) {
      sails.log.info(sponsor.name, ": ", sponsor.deviation);
    });
    return apiKey.sponsors;
  },
  //requestType = 'mvr' or 'autoplus'
  selectSponsor: function (apiKey, requestType) {
    return _.max(this.calculateDeviation(apiKey, requestType), (sponsor) => {
      return sponsor.deviation;
    });
  }
};
