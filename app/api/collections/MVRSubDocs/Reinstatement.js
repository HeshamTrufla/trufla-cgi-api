'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    EligibleDate: Date,
    Condition: [{
        Code: String,
        Description: String
    }],
    Date: Date,
    Description: String,
    Type: String

});

module.exports = schema;