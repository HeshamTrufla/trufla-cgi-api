var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    VehicleEventID: String,
    ProviderCode: String,
    ProviderServiceCode: String,
    DPMRequestID: String,
    ResultCode: String,
    VIN: String

});

module.exports = schema;