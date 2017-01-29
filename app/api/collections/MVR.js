'use strict';
var mongoose = require('mongoose');
var subDocs = require('./MVRSubDocs'); // load MVR Sub-documents 

var schema = new mongoose.Schema({
    
    DriverLicenceNumber: {
        type: String,
        unique: true
    },
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
    Clients: [subDocs.Clients],
    IsReady: Boolean,
    ReadyDate: Date

},{
    timestamps: true
});

exports.schema = schema;