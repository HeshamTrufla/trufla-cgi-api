var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    VehicleRepairHistoryID: String,
    IncidentDate: Date,
    MileageKMs: Number,
    PointOfImpact: String,
    ProbableFaultPercentage: String,
    FrameDamagedIndicator: String,
    DriveableIndicator: String,
    ClaimFoundInAP: String,
    AirbagDeployedIndicator: String,
    TotalLossIndicator: String,
    GrossEstimateDollars: Number,
    LocationCity: String,
    LocationStateProvince: String,
    InsuranceCompanyCode: String,
    InsuranceCompany: String,
    ClaimNumber: String,
    PolicyNumber: String,
    Reference: String,
    VehicleOriginalYear: Number,
    VehicleOriginalMonth: Number,
    VehicleOriginalDay: Number,
    VehicleRemoveYear: Number,
    VehicleRemoveMonth: Number,
    VehicleRemoveDay: Number,
    APLPolicyNumber: String,
    APLInsuranceCompanyCode: String,
    APLInsuranceCompanyName: String,
    TotalLoss: String

});

module.exports = schema;