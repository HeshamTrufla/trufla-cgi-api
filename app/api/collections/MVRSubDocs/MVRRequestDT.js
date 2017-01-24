'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    RequestReceipt: String,
    DriverLicenceProvinceCode: String,
    DriverLicenceNumber: String,
    OrderImmediateInd: String,
    DriverDateOfBirth: Date,
    DriverGender: String,
    DriverLastName: String,
    DriverFirstName: String,
    DriverMiddleName: String,
    RequestReference: String,
    RequestComment: String,
    PredictorCheckOverrideInd: String,
    DuplicateCheckOrderOverrideInd: String,
    AbstractFormat: String,
    SuspendAbstractResponseInd: String,
    Username: String,
    ExplicitRequesteResponsePoolInd: String,
    ConsentType: String,
    Language: String,
    SignatureCode: String

});

module.exports = schema;