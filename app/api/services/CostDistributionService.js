/**
 * Created by wasee on 2017-02-24.
 */
module.exports = {

  calculateDeviation: function (apiKey) {
    _.forEach(apiKey.sponsors, function (sponsor) {
      var currentPercent = (apiKey.totalCost > 0 ? (sponsor.totalCost / apiKey.totalCost) : 0);
      sponsor.deviation = Math.abs(sponsor.percent - currentPercent);

    });
    apiKey.sponsors = _.sortBy(apiKey.sponsors, (sponsor) => {
      return sponsor.deviation
    });
    _.forEach(apiKey.sponsors, function (sponsor) {
      sails.log.info(sponsor.name, ": ", sponsor.deviation);
    });
    return apiKey.sponsors;
  },
  selectSponsor: function (apiKey) {
    return _.max(this.calculateDeviation(apiKey), (sponsor) => {
      return sponsor.deviation;
    });
  }
};
