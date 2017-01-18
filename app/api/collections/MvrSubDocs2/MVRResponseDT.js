'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    RequestReceipt: String,
    RequestErrorInd: String,
    RequestOrderInd: String,
    DuplicateRequestInd: String,
    PredictorInvokedInd: String,
    PredictorUnavailableInd: String,
    PredictorOrderInd: String,
    PredictorScore: Number,
    AbstractInd: String,
    AbstractHasConvictionCodesInd: String,
    AbstractFormat: String,
    Username: String,
    UserFirstName: String,
    UserLastName: String,
    ProviderResponseDateTime: Date,
    ResponseSentDateTime: Date,
    ReceivedDateTime: Date,
    ReprintDateTime: Date,
    RequestResponsePoolInvokedInd: String,
    SubscriberName: String,
    SponsoringSubscriberID: String,
    SponsoringSubscriberName: String

});

module.exports = schema;