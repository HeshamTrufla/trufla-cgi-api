'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    LicenceNumber: String,
    Name: String,
    BirthDate: Date,
    LicenceStatus: String,
    LicenceClass: String,
    LicenceStatusExpanded: {
        Code: [String],
        Description: [String]
    },
    Code: String,
    Description: String,
    Surname: String,
    FirstName: String,
    MiddleName: String,
    OldLicenceNumber: String,
    Gender: String,
    Height: Number,
    Weight: Number,
    LicenceCondition: String,
    LicenceRestriction: String,
    LicenceEndorsement: String,
    LicenceIssueDate: Date,
    LicenceExpiryDate: Date,
    IsLicenceSuspended: Boolean,
    FirstLicencedComment: String,
    DemeritPoints: Number,
    GraduatedDriverLicence: {
        Type: String,
        Description: String,
        ExpiryDate: Date
    },
    Type: String,
    ExpiryDate: Date,
    Address: {
        Street: String,
        Municipality: String,
        Province: String,
        AddressLine: [String],
        PostalCode: String
    },
    FirstLicenceComment: String

});

module.exports = schema;