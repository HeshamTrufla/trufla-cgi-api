/**
 * Created by wasee on 2017-02-24.
 */
module.exports = {

  selectSponsor: function (apiKey, requestType) {

  const selected =
    _(apiKey.sponsors)
      .map((sponsor) => {
        const currentPercent = apiKey.totalCost > 0 ? (sponsor.totalCost / apiKey.totalCost) : 0;
        sponsor.deviation = Math.abs(sponsor.percent - currentPercent);
        return sponsor;
      })
      .sortBy('deviation')
      .filter(requestType)
      .maxBy('deviation').name;

    const selectedSponsor = _.find(apiKey.sponsors, (sponsor) => {
      return sponsor.name === selected;
    });

    sails.log.info('request type', requestType);
    sails.log.info('Sponsors', JSON.stringify(apiKey.sponsors, null, 2));
    sails.log.info('Selected Sponsor', selectedSponsor);

    return selectedSponsor;
  }
};
