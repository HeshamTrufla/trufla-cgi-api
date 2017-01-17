var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    CompanyCode: String,
    PolicyNumber: String,
    FirstName: String,
    MiddleName: String,
    LastName: String,
    UnstructuredName: String,
    StructuredNameInd: String,
    LicenceProvinceCode: String,
    LicenceNumber: String

});

module.exports = schema;