var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    ProviderCode: String,
    ProviderServiceCode: String,
    DPMRequestID: Number,
    ResultCode: String,
    VIN: String,
    VehicleMarking: String,
    OdometerReading: String,
    OdometerReadingUnit: String,
    MarkingDate: Date

});

module.exports = schema;