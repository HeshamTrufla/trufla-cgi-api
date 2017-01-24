'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    attributes: {
        version: String,
        province: String
    },
    RequestId: String,
    IBCRequestId: String,
    IBCProductId: String,
    RequestInfo: {
        DriverLicenceNumber: String,
        BirthDate: Date
    },
    DriverInfo: require('./DriverInfo'),
    Condition: {
        Date: Date,
        Description: String
    },
    Conviction: [ require('./Conviction') ],
    Suspension: [ require('./Suspension') ],
    Reinstatement: require('./Reinstatement'),
    Prohibition: require('./Prohibition'),
    Restriction: require('./Restriction'),
    Merit: require('./Merit'),
    Accident: require('./Accident'),
    Report: {
        PrintLineWidth: Number,
        PrintLine: String
    },
    ProviderMessage: {
        Code: String,
        Text: String
    },
    ProviderError: {
        Code: String,
        Type: String,
        Text: String
    }

});

module.exports = schema;