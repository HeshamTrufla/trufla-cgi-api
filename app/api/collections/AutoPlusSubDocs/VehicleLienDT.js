var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    VehicleLienID: String,
    ProviderCode: String,
    ProviderServiceCode: String,
    DPMRequestID: Number,
    ResultCode: String,
    VIN: String

});

module.exports = schema;