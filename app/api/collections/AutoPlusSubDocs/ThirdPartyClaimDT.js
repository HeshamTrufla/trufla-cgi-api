var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    ClaimId : String,
    CompanyCode: String,
    PolicyNumber: String,
    ClaimYear: Number,
    ClaimMonth: Number,
    ClaimDay: Number,
    ExpenseAmt: Number,
    ClassTypeOfUseCode: String,
    UseCode: String,
    TPLClaimFreeYears: Number,
    CollClaimFreeYears: Number,
    DriverBirthYear: Number,
    DriverYearsLicenced: Number,
    DriverYearsLicencedExp: Number,
    DriverTrainingInd: String,
    DriverGender: String,
    ExcludedDriverInd: String,
    LastUpdateDate: Date,
    PolicyVehicleId: String,
    IAOCompanyInd: String

});

module.exports = schema;