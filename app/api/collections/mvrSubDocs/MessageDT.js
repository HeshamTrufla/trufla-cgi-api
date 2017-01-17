'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    RequestReceipt: String,
    Code: String,
    Text: String

});

module.exports = schema;