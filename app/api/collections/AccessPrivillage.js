var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    
    Read: [{
        Table: String,
        Attributes: []
    }],

    Write: [{
        Table: String,
        Attributes: []
    }]


}, {
    timestamps: true
});

exports.schema = schema;