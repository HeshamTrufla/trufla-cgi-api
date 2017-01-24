var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    
    read: [{
        table: String,
        attributes: []
    }],

    write: [{
        table: String,
        attributes: []
    }]

}, {
    timestamps: true
});

exports.schema = schema;