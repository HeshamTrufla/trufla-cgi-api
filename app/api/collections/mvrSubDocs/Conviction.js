'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    attributes: {
        type: String
    },
    Code: String,
    MinistryCode: String,
    OffenceDate: Date,
    ConvictionDate: Date,
    StartDate: Date,
    ExpiryDate: Date,
    Description: [String],
    ReferenceNumber: String,
    CaseNumber: String,
    Jurisdiction: String,
    LocationCode: String,
    Status: String,
    RSPEICode: String,
    IsOutOfProvince: Boolean,
    DemeritPoints: Number,
    CumulativeDemeritPoints: Number,
    PrintLine: [String],
    Type: String

});

module.exports = schema;