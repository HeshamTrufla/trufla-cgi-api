'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    attributes: {
        type: {
            type: String
        }
    },
    ReferenceNumber: String,
    Date: Date,
    Description: String,
    DemeritPoints: Number,
    PrintLine: [String]

});

module.exports = schema;