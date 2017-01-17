var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    VehicleRepairHistoryID: String,
    ProviderCode: String,
    ProviderServiceCode: String,
    UnavailableSources: Number,
    DPMRequestID: Number,
    ResultCode: String,
    VIN: String,
    Reference: String

});

module.exports = schema;