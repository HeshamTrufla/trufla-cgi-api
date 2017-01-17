var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    ClaimId : String,
    CompanyCode: String,
    PolicyNumber: Number,
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
    DriverYearsLicencedExp: String,
    DriverTrainingInd: String,
    DriverGender: String,
    ExcludedDriverInd: String,
    LastUpdateDate: Date,
    PolicyVehicleId: String,
    IAOCompanyInd: String,
    Source: String,

});

module.exports = schema;