var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    ClaimId : String,
    KindOfLossCode: String,
    KindOfLossCodeExp: String,
    OutstandingReserveReportYear: Number,
    OutstandingReserveReportMonth: Number,
    VehicleLossCode: String,
    LossAmtTotal: Number,
    OutstandingReserveReportOccur: String,
    LastUpdateDate: Date

});

module.exports = schema;