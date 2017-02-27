module.exports = {

  attributes: {
    DriverLicenceNumber: {
      type: 'string',
      required: true
    },
    ProvinceCode: {
      type: 'string',
      required: true
    },
    MVR_ID: {
      type: 'string',
      primaryKey: true,
      unique: true,
      required: true
    }
  }
};
