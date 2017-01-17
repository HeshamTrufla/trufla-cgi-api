var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    CompanyCode: String,
    PolicyNumber: String,
    PolicyDriverId: String,
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
    BirthDay: Number,
    BirthMonth: Number,
    MostRecentPolicyInd: String,
    Gender: String,
    ICPBWarningPossibleMatchInd: String,
    PolicyVehicleCode: String,
    DriverGridScore: String,
    DriverGridScoreDay: Number,
    DriverGridScoreMonth: Number,
    DriverGridScoreYear: Number,
    Age: String,
    LastUpdateDate: String,
    MaritalStatus: String,

});

module.exports = schema;