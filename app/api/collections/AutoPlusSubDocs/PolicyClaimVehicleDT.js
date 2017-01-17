var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    ClaimId : String,
    PolicyVehicleId: String,
    CompanyCode: String,
    PolicyString: String,
    VIN: String,
    ModelYear: Number,
    MakeEng: String,
    MakeFre: String,
    ModelEng: String,
    ModelFre: String,
    VehicleType: String,
    BodyTypeCode: String,
    DriveTypeCode: String,
    DateSoldOrSalvaged: Date,
    ICPBReportReference: String,
    VehicleFixableInd: String,
    VINStatus: String,
    VehicleCode: String,
    ClassTypeOfUseCode: String,
    UseCode: String,
    VehicleDescEng: String,
    VehicleDescFre: String,
    VehicleDescInd: String,

});

module.exports = schema;