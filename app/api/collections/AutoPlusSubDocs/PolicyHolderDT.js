var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    CompanyCode: String,
    PolicyNumber: String,
    PolicyHolderId: String,
    PolicyDriverId: String,
    DeletedInd: String,
    FirstName: String,
    MiddleName: String,
    LastName: String,
    UnstructuredName: String,
    StructuredNameInd: String,
    CompanyInd: String,
    BirthYear: Number,
    BirthMonth: Number,
    BirthDay: Number,
    Gender: String,
    StreetAndUnit: String,
    City: String,
    ProvinceCode: String,
    PostalCode: String,
    StructuredAddressInd: String,
    UnstructuredAddress: String,

});

module.exports = schema;