var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    Key: String,

    AccessPrivillage: {
        type: String,
        ref: 'AccessPrivillage'
    }

}, {
    timestamps: true
});

exports.schema = schema;