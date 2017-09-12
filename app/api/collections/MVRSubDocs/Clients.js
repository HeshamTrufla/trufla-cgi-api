'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    ApiKey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApiKey'
    },
    Callback: {
        type: String
    },
    IsDelivered: {
        type: Boolean
    },
    errorDelivered:{
        type: Boolean
    },
    RetriesNumber: {
        type: Number
    }

});

module.exports = schema;