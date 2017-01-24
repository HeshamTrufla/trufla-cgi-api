var mongoose = require('mongoose');

// duplicated

var schema = new mongoose.Schema({

    ClaimId: String,
    KindOfLossCode: String,
    KindOfLossCodeExp: String,
    Sequence: Number,
    LossAmt: Number,
    UITTransactionTypeCode: String

});

module.exports = schema;