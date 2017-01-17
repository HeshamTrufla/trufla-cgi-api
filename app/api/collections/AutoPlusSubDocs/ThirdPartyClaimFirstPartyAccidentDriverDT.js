var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    ClaimId : String,
    PolicyDriverId: String,
    CompanyCode: String,
    PolicyNumber: String,
    DeletedInd: String,
    LicenceNumberStatus: String,
    DriverRelationshipCode: String,
    PrincipalOperatorInd: String,
    PolicyVehicleId: String,
    LicenceProvinceCode: String,
    LicenceNumber: String,
    YearsLicenced: Number,
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
    NameAvailableInd: String,
    AtFaultInd: String,
    AtFaultPct: String,
    CompanyName: String,
    Abbreviation: String

});

module.exports = schema;