var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    ProvStateDesc: String,
    ProvStateCode: String,
    CountryDesc: String,
    CountryCode: String,
    EventSource: String,
    EventDesignation: String,
    EventType: String,
    EventDate: String,
    VehicleEventID: String
    
});

module.exports = schema;