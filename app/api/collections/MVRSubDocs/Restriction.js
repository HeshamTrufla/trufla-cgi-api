'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    ReferenceNumber: String,
    CaseNumber: String,
    StartDate: Date,
    ExpiryDate: Date,
    Description: String,
    PrintLine: [String],
    Type: String

});

module.exports = schema;