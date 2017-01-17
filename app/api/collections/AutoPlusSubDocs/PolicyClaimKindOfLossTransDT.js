var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    ClaimId: String,
    KindOfLossCode: String,
    KindOfLossCodeExp: String,
    Sequence: Number,
    LossAmt: Number,
    UITTransactionTypeCode: String

});

module.exports = schema;