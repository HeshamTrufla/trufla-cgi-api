'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    ApiKey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApiKey'
    },
    Callback: {
        type: String,
        unique: true
    },
    IsDelivered: {
        type: Boolean
    },
    RetriesNumber: {
        type: Number
    }

},
{ 
    _id: false
});

module.exports = schema;