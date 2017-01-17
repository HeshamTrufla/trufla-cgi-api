var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    VehicleLienID: String,
    LienRegistrationDate: String,
    LienRegistrationNumber: String,
    LienDischargeDate: String,
    LienHolder: String

});

module.exports = schema;