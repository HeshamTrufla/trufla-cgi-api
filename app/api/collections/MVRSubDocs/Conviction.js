'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    attributes: {
        type: {
            type: String
        }
    },
    Code: String,
    MinistryCode: String,
    ProvinceCode: String,
    OffenceDate: Date,
    ConvictionDate: Date,
    StartDate: Date,
    ExpiryDate: Date,
    Description: [{
        type: String,
        set: function (v) {
            if (typeof v === 'string')
                return v;
            else 
                return v['$value'];
        }
    }],
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