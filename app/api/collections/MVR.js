'use strict';
var mongoose = require('mongoose');
var subDocs = require('./mvrSubDocs'); // load MVR Sub-documents 

var schema = new mongoose.Schema({
    
    DriverLicence: String,
    MVRRequestResponseDS: {
        MVRRequestDT: subDocs.MVRRequestDT,
        MVRResponseDT: subDocs.MVRResponseDT,
        DataFormatAbstractDT: {
            RequestReceipt: String,
            Abstract: {
                MVRAbstract: subDocs.MVRAbstract
            }
        },
        MessageDT: subDocs.MessageDT
    },
    Callback: String,
    IsReady: Boolean,
    IsDelivered: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
});

exports.schema = schema;