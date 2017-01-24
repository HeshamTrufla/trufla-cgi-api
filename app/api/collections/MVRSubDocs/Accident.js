'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    Date: Date,
    Description: String,
    ReportRetrievalNum: String,
    Code: String,
    Type: String,
    DamageAmount: Number,
    Province: String,
    PropertyDamage: String,
    Fatalities: String,
    Injury: String

});

module.exports = schema;