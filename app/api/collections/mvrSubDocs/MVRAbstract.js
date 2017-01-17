'use strict';
var mongoose = require('mongoose');
var subDocs = require('./index');

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
    DriverInfo: subDocs.DriverInfo,
    Condition: {
        Date: Date,
        Description: String
    },
    Conviction: [subDocs.Conviction],
    Suspension: [subDocs.Suspension],
    Reinstatement: subDocs.Reinstatement,
    Prohibition: subDocs.Prohibition,
    Restriction: subDocs.Restriction,
    Merit: subDocs.Merit,
    Accident: subDocs.Accident,
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