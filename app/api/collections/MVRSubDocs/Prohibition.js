'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    attributes: {
        type: {
            type: String
        }
    },
    ReferenceNumber: String,
    CaseNumber: String,
    StartDate: Date,
    ExpiryDate: Date,
    TermLength: String,
    AppealEndDate: Date,
    ReinstateDate: String,
    Description: String,
    PrintLine: [String],
    Type: String

});

module.exports = schema;