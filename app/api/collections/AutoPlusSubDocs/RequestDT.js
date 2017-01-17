var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    CompanyCode: String,
    PolicyNumber: String,
    LicenceProvinceCode: String,
    LicenceNumber: String,
    RequestReference: String,
    Insured: String,
    OverrideYearLimitFeatureBln: Boolean,
    DeferRequestResponseInd: String,
    Username: String,
    UserFirstName: String,
    UserLastName: String,
    SubscriberName: String,
    RequestReceipt: String,
    AutoFillRequestInd: String,
    AutoFillRequestReceipt: String,
    SponsoringSubscriberID: String,
    SponsoringSubscriberName: String,
    RequestDate: Date

});

module.exports = schema;