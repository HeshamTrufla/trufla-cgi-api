var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    ClaimId : String,
    PolicyDriverId: String,
    NameAvailableInd: String,
    LicenceNumberStatus: String,
    CompanyCode: String,
    PolicyNumber: String,
    UtilizationCode: String,
    LicenceProvinceCode: String,
    LicenceNumber: String,
    YearsLicenced: String,
    YearsLicencedExp: Number,
    DriverTrainingInd: String,
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
    CompanyName: String,
    Abbreviation: String,
    PolicyNumberExp: String,
    LastUpdateDate: String,
    PolicyDriverClaimCode: String

});

module.exports = schema;