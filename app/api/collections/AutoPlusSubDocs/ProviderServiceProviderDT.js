var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    ProviderCode: String,
    ProviderServiceCode: String,
    ProviderServiceStatusCode: String,
    DPMBatchRequestID: String

});

module.exports = schema;