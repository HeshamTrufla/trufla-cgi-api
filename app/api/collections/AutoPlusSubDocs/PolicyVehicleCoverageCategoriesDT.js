var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    CompanyCode: String,
    PolicyNumber: String,
    PolicyVehicleId: String,
    CoverageCategoryCode: String,

});

module.exports = schema;