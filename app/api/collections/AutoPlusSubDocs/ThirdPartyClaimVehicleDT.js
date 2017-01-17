var mongoose = require('mongoose');

// duplicated

var schema = new mongoose.Schema({

    ClaimId : String,
    PolicyVehicleId: String,
    CompanyCode: String,
    PolicyNumber: String,
    VIN: String,
    ModelYear: Number,
    MakeEng: String,
    MakeFre: String,
    ModelEng: String,
    ModelFre: String,
    VehicleType: String,
    BodyTypeCode: String,
    DriveTypeCode: String,
    CarCode: String,
    DateSoldOrSalvaged: Date,
    ICPBReportReference: String,
    VehicleFixableInd: String,
    VINStatus: String,
    VehicleCode: String,
    ClassTypeOfUseCode: String,
    UseCode: String,
    VehicleDescEng: String,
    VehicleDescFre: String,
    VehicleDescInd: String

});

module.exports = schema;