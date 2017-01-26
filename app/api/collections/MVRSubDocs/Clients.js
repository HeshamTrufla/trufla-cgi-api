'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    ApiKey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApiKey'
    },
    CallBack: String,
    IsDelivered: {
        type: Boolean,
        default: false
    },
    RetriesNumber: {
        type: Number,
        default: 0
    }

});

module.exports = schema;