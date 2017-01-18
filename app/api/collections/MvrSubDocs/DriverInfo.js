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
    Height: Number,
    Weight: Number,
    LicenceCondition: String,
    LicenceRestriction: String,
    LicenceEndorsement: String,
    LicenceIssueDate: Date,
    LicenceExpiryDate: Date,
    IsLicenceSuspended: Boolean,
    DemeritPoints: Number,
    GraduatedDriverLicence: String,
    Type: String,
    ExpiryDate: Date,
    Description: String,
    Address: String,
    FirstLicenceComment: String

});

module.exports = schema;