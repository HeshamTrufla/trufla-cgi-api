var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    
    autoPlusUrl: String,
    MVRUrl: String,
    userName: String,
    password:String

}, {
    timestamps: true
});

exports.schema = schema;