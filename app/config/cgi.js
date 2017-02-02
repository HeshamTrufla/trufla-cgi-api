module.exports.cgi = {

    autoPlusUrl: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/DriverClaimHistoryGoldWS.asmx?WSDL',
    USER_NAME: 'ws.test@sharpinsurance.ca',
    PASSWORD: 'SharpTest1',     
    
    // TODO: add more messages.
    MESSAGES: [
        {
            INTERNAL_CODE: 'MVR_SUCCESS',
            CODE: '200230100',
            TEXT: 'Request Completed Successfully',
            SOURCE: 'CGI',
            HTTP_STATUS: 200,
            IS_ERROR: false  
        },
        {
            INTERNAL_CODE: 'AUTOPLUS_SUCCESS',
            CODE: '200020200',
            TEXT: 'Request Completed Successfully',
            SOURCE: 'CGI',
            HTTP_STATUS: 200,
            IS_ERROR: false  
        },
        {
            INTERNAL_CODE: 'NO_RESPONSE',
            CODE: 'CODETOUCH501',
            TEXT: 'No response returned!',
            SOURCE: 'CT', // Code Touch
            HTTP_STATUS: 500,
            IS_ERROR: true 
        },
        {
            INTERNAL_CODE: 'AUTOPLUS_NO_RESPONSE',
            CODE: '200020203',
            TEXT: 'No data found, no policies were found for the supplied licence number.',
            SOURCE: 'CGI', // Code Touch
            HTTP_STATUS: 404,
            IS_ERROR: true 
        },
        {
            INTERNAL_CODE: 'NO_RESULTS',
            CODE: 'CODETOUCH502',
            TEXT: 'Returned Document doesn\'t contain a results!',
            SOURCE: 'CT',
            HTTP_STATUS: 500,
            IS_ERROR: true 
        },
        {
            INTERNAL_CODE: 'NO_MESSAGE',
            CODE: 'CODETOUCH503',
            TEXT: 'Returned doesn\'t contain a Message!' ,
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
        },
        {
            INTERNAL_CODE: 'INVALID_ACCESS_KEY',
            CODE: 'CODETOUCH507',
            TEXT: 'You are not permitted to perform this action.' ,
            SOURCE: 'CT',
            HTTP_STATUS: 403,
            IS_ERROR: true 
        },
        {
            INTERNAL_CODE: 'MVR_INVALID_LICENSE_NUMBER',
            CODE: 'LV03',
            TEXT: 'The Licence Number Birthdate is invalid.' ,
            SOURCE: 'CGI',
            HTTP_STATUS: 400,
            IS_ERROR: true 
        },
        {
            INTERNAL_CODE: 'MVR_INVALID_LICENSE_NUMBER',
            CODE: 'LV02',
            TEXT: 'The Licence Number Check Digit is incorrect.' ,
            SOURCE: 'CGI',
            HTTP_STATUS: 400,
            IS_ERROR: true 
        },
        {
            INTERNAL_CODE: 'AUTOPLUS_INVALID_LICENSE_NUMBER',
            CODE: '200020202',
            TEXT: 'Invalid Licence Number parameter, Licence Number is null or spaces.',
            SOURCE: 'CGI',
            HTTP_STATUS: 400,
            IS_ERROR: true 
        },
        {
            INTERNAL_CODE: 'AUTOPLUS_INVALID_LICENSE_FORMAT',
            CODE: '200020204',
            TEXT: 'Licence number format is invalid, the supplied licence number does not match the format for the province supplied.',
            SOURCE: 'CGI',
            HTTP_STATUS: 400,
            IS_ERROR: true 
        },
        {
            INTERNAL_CODE: 'PROVINCE_CODE_REQUIRED',
            CODE: 'CODETOUCH508',
            TEXT: 'ProvinceCode missing.' ,
            SOURCE: 'CT',
            HTTP_STATUS: 400,
            IS_ERROR: true 
        },
        {
            INTERNAL_CODE: 'AUTOPLUS_PROVINCE_CODE_INVALID',
            CODE: '200020201',
            TEXT: 'Invalid Province Code parameter, Province Code is null or spaces.' ,
            SOURCE: 'CGI',
            HTTP_STATUS: 400,
            IS_ERROR: true 
        }
    ],

    MVR: {
        URL: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/MVRWS.asmx?wsdl',
        USER_NAME: 'ws.test@sharpinsurance.ca',
        PASSWORD: 'SharpTest1'        
    },
    AutoPlus: {
        URL: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/DriverClaimHistoryGoldWS.asmx?WSDL',
        USER_NAME: 'ws.test@sharpinsurance.ca',
        PASSWORD: 'SharpTest1'
    }


}