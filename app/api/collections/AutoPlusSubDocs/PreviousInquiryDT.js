var mongoose = require('mongoose');


var schema = new mongoose.Schema({

    CompanyCodePolicyCompany: String,
    PolicyNumber: String,
    InquiryIncidence: Number,
    CompanyCodeInquiryCompany: String,
    CompanyName: String,
    InquiryYear: Number,
    InquiryMonth: Number,
    InquiryDay: Number,

});

module.exports = schema;