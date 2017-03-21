module.exports = {

  attributes: {
    LicenceNumber: {
      type: 'string',
      required: true
    },
    ProvinceCode: {
      type: 'string',
      required: true
    },
    autoPlusId: {
      type: 'string',
      primaryKey: true,
      required: true
    }
  }
};
