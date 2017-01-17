var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    CompanyCode: String,
    PolicyNumber: String,
    CompanyName: String,
    PolicyStatus: String,
    PolicyCoverageYear: Number,
    PolicyCoverageMonth: Number,
    PolicyCoverageDay: Number,
    ProcessYear: Number,
    ProcessMonth: Number,
    ProcessDay: Number,
    OriginalEffectiveYear: Number,
    OriginalEffectiveMonth: Number,
    CurrentEffectiveYear: Number,
    CurrentEffectiveMonth: Number,
    CurrentExpiryYear: Number,
    CurrentExpiryMonth: Number,
    CurrentExpiryDay: Number,
    CoverageExpiryYear: Number,
    CoverageExpiryMonth: Number,
    CoverageExpiryDay: Number,
    NumberOfPreviousInquiries: Number,
    PolicyHolderId: String,
    PolicyOnHoldInd: String,
    MostRecentPolicyInd: String,
    OriginalEffectiveDay: Number,
    CurrentEffectiveDay: Number,
    CommercialPolicyInd: String,
    LineOfBusinessCode: String,
    NoFrillPolicy: String,
    FARejectedCompany: String,
    MarketingGroup: String,
    AlbertaGridInd: String,

});

module.exports = schema;