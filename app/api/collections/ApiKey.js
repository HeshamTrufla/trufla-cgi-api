var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    key: String,
    name: String,
    category: String,
    revoked: Boolean,

    accessPrivillage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccessPrivillage'
    }

}, {
    timestamps: true
});

exports.schema = schema;