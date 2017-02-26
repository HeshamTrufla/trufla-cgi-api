var mongoose = require('mongoose');


var schema = new mongoose.Schema({

  key: String,
  name: String,
  category: String,
  revoked: Boolean,
  sponsors: [{
    id: String,
    name: String,
    percent: Number,
    totalCost: Number
  }],
  accessPrivillage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccessPrivillage'
  },
  totalCost: Number
}, {
  timestamps: true
});

exports.schema = schema;
