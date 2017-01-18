var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    Key: String,
    name: String,
    category: String,
    revoked: Boolean,

    AccessPrivillage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccessPrivillage'
    }

}, {
    timestamps: true
});

exports.schema = schema;