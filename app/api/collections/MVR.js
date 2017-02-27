'use strict';
var mongoose = require('mongoose');
var subDocs = require('./MVRSubDocs'); // load MVR Sub-documents

var schema = new mongoose.Schema({

  DriverLicenceNumber: {
    type: String,
    unique: false
  },
  ProvinceCode: {
    type: String,
    unique: false
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
    PrintFormatAbstractDT: mongoose.Schema.Types.Mixed,
    MessageDT: subDocs.MessageDT,

  },
  raw: String,
  Clients: [subDocs.Clients],
  IsReady: Boolean,
  ReadyDate: Date
}, {
  timestamps: true
});

exports.schema = schema;
