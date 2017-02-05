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
    AccountNumber: String,
    RequestInfo: {
        DriverLicenceNumber: String,
        BirthDate: Date
    },
    DriverInfo: require('./DriverInfo'),
    Condition: [{
        ConditionId: String,
        Date: Date,
        Description: String
    }],
    Conviction: [ require('./Conviction') ],
    Suspension: [ require('./Suspension') ],
    Reinstatement: [require('./Reinstatement')],
    Prohibition: require('./Prohibition'),
    Restriction: require('./Restriction'),
    Merit: require('./Merit'),
    Accident: [require('./Accident')],
    Report: {
        PrintLineWidth: Number,
        PrintLine: String
    },
    ProviderMessage: [{
        Code: String,
        Text: [{
            type: String,
            set: function (v) {
                v = v['$value'];
                return v;
            }
        }]
    }],
    ProviderError: {
        Code: String,
        Type: String,
        Text: String
    },
    Endorsement: [{
        Id: String,
        EndorsementName: String
    }],
    Course: [{
        Code: String,
        Description: String,
        Date: Date
    }]

});

module.exports = schema;