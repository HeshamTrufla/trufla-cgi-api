module.exports.cgi = {

    autoPlusUrl: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/DriverClaimHistoryGoldWS.asmx?WSDL',
    userName: 'ws.test@sharpinsurance.ca',
    password: 'SharpTest1',

    MVR: {
        URL: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/MVRWS.asmx?wsdl',
        USER_NAME: 'ws.test@sharpinsurance.ca',
        PASSWORD: 'SharpTest1',
        MESSAGES: [
            {
                INTERNAL_CODE: 'SUCCESS',
                CODE: '200230100',
                TEXT: 'Request Completed Successfully',
                SOURCE: 'CGI',
                HTTP_STATUS: 200,
                IS_ERROR: false  
            },
            {
                INTERNAL_CODE: 'NO_RESPONSE',
                CODE: 'CODETOUCH501',
                TEXT: 'No MVR response returned!',
                SOURCE: 'CT', // Code Touch
                HTTP_STATUS: 500,
                IS_ERROR: true 
            },
            {
                INTERNAL_CODE: 'NO_RESULTS',
                CODE: 'CODETOUCH502',
                TEXT: 'Returned MVR Document doesn\'t contain a results!',
                SOURCE: 'CT',
                HTTP_STATUS: 500,
                IS_ERROR: true 
            },
            {
                INTERNAL_CODE: 'NO_MESSAGE',
                CODE: 'CODETOUCH503',
                TEXT: 'Returned MVR doesn\'t contain a Message!' ,
                SOURCE: 'CT',
                HTTP_STATUS: 500,
                IS_ERROR: true 
            },
            {
                INTERNAL_CODE: 'UNHANDLED_ERROR',
                CODE: 'CODETOUCH504',
                TEXT: 'Unhandled Exception Error!' ,
                SOURCE: 'CT',
                HTTP_STATUS: 500,
                IS_ERROR: true 
            },
            {
                INTERNAL_CODE: 'ABSTRACT_NOT_READY',
                CODE: 'CODETOUCH505',
                TEXT: 'Abstract Not Ready!' ,
                SOURCE: 'CT',
                HTTP_STATUS: 200,
                IS_ERROR: false 
            },
            {
                INTERNAL_CODE: 'ABSTRACT_FOUND',
                CODE: 'CODETOUCH506',
                TEXT: 'Abstract Found!' ,
                SOURCE: 'CT',
                HTTP_STATUS: 200,
                IS_ERROR: false 
            },
            {
                INTERNAL_CODE: 'DRIVER_LICENSE_NOT_FOUND',
                CODE: 'I1005',
                TEXT: 'DRIVER LICENSE NUMBER NOT FOUND ON DATABASE' ,
                SOURCE: 'PR',
                HTTP_STATUS: 404,
                IS_ERROR: true 
            }
        ]
    }

}