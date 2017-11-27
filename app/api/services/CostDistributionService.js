/**
 * Created by wasee on 2017-02-24.
 */

const _ = require('lodash');

module.exports = {

  selectSponsor: function (apiKey, requestType) {

    const selected =
      _(apiKey.sponsors)
        .map((sponsor) => {
          const optimalCost = apiKey.totalCost * sponsor.percent;
          //Calculate the percentage between the optimal cost and the actual cost. (i.e if deviation =1 that means current actual cost is 100% of the optimal cost)
          sponsor.deviation = optimalCost === 0 ? 1 : sponsor.totalCost / optimalCost;
          return sponsor;
        })
        .sortBy('deviation')
        .filter(requestType)
        .minBy('deviation').name;

    const selectedSponsor = _.find(apiKey.sponsors, (sponsor) => {
      return sponsor.name === selected;
    });

    sails.log.info('request type', requestType);
    sails.log.info('Sponsors', JSON.stringify(apiKey.sponsors, null, 2));
    sails.log.info('Selected Sponsor', selectedSponsor);

    return selectedSponsor;
  }
};
