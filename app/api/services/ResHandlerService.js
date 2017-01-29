module.exports = {

    /**
     * this function will take a mvr response,
     * and check cgi&providers messages to return
     * MESSAGE object and original document. 
     */
    MVR: function (mvrResponse) {
        return new Promise ((resolve, reject) => {

            if (!mvrResponse) return reject(getMessage('NO_RESPONSE', true));
            if (!mvrResponse.SubmitRequestResult || !mvrResponse.SubmitRequestResult.MVRRequestResponseDS) return reject(getMessage('NO_RESULTS', true));
            var requestResult = mvrResponse.SubmitRequestResult.MVRRequestResponseDS;
            // check CGI Messages
            if (!requestResult.MessageDT) return reject(getMessage('NO_MESSAGE', true)); 
            // get cgi message.
            var cgiMessage = getMessage(requestResult.MessageDT.Code); 
            // if message not found, return Unhandled Exception Error.
            if (!cgiMessage) return reject(getMessage('UNHANDLED_ERROR', true)); 
            // check if cgi returned error message.
            if (cgiMessage.IS_ERROR) return reject(cgiMessage); 

            // check if abstract returned.
            var mvrAbstract = _.get(requestResult, 'DataFormatAbstractDT.Abstract.MVRAbstract');
            
            if (!mvrAbstract) return resolve(bindMessage(mvrResponse, 'ABSTRACT_NOT_READY', true));

            // at this point we have a cgi message which is not error and we have abstract object.
            // so we need to check CGI's Provdier Messages for any errors before we assume that we have a Client abstract.
            if (mvrAbstract.ProviderError) return reject(getMessage(mvrAbstract.ProviderError.Code) || getMessage('UNHANDLED_ERROR', true));

            // otherwise by now we should have the abstract.            
            return resolve(bindMessage(mvrResponse, 'ABSTRACT_FOUND', true));

        });
    }

};

function bindMessage(mvrResponse, msgCode, internalCode) {
    var msg = getMessage(msgCode, internalCode);
    return {
        mvrDoc: mvrResponse,
        message: msg
    };
}

function getMessage (msgCode, internalCode) {

    if (internalCode) {
        return _.find(sails.config.cgi.MVR.MESSAGES, (msg) => msg.INTERNAL_CODE == msgCode);
    }
    else {
        return _.find(sails.config.cgi.MVR.MESSAGES, (msg) => msg.CODE == msgCode);
    }

}