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
    Callback: String,
    IsReady: Boolean,
    IsDelivered: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
});

schema.virtual('MVR_ID').get(function () {
  return this._id;
});

exports.schema = schema;