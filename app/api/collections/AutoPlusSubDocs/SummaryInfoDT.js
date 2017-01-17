var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    YearsOnAutoPlus: Number,
    YearsClaimFree: Number,
    ClaimsInLast6Years: Number,
    AtFaultClaims: Number,
    FirstPartyClaims: Number,
    ThirdPartyClaims: Number,
    TotalLossAmount: Number,
    TotalExpenseAmount: Number,
    AutoPlusCheckResult: String,
    PolicyDriverCurrentAge: String,
    RepairHistoryAlert: String

});

module.exports = schema;