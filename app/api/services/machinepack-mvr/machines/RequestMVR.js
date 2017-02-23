module.exports = {

    friendlyName: 'MVR - RequestMVR',

    description: 'CGI - MVR service integrator, to make requests and convert the returned xml response into json using soap action => SubmitRequest',

    extendedDescription: 'This method allows authorized user to submit a single request to MVR Web Services. The request can be processed immediately or overnight.',

    cacheable: false,

    sync: false,

    inputs: {
        Url: {
            example: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/MVRWS.asmx?wsdl',
            description: 'service WSDL file url',
            required: true
        },
        UserName: {
            example: 'ws.test@sharpinsurance.ca',
            description: 'Userid assigned by CGI.  The format is e-mail address',
            required: true
        },
        Password: {
            example: 'SharpTest1',
            description: 'Valid password provided by CGI.',
            required: true
        },
        SponsorSubscriberID: {
            example: '12345',
            description: 'The subscriber id of the Insurance company paying for the service.'
        },
        DriverLicenceProvinceCode: {
            example: 'ON',
            description: 'Province code',
            required: true
        },
        DriverLicenceNumber: {
            example: 'W35125910545606',
            description: 'Driver license requested',
            required: true
        },
        OrderImmediateInd: {
            example: 'Y',
            description: 'Y – for immediate response, and N – for overnight'
        },
        DriverDateOfBirth: {
            example: 'yyyy/mm/dd'
        },
        DriverGender: {
            example: 'M'
        },
        DriverFirstName: {
            example: 'Sheldon',
            description: 'First name of requested driver'
        },
        DriverLastName: {
            example: 'Cooper',
            description: 'Last name of requested driver'
        },
        DriverMiddleName: {
            example: 'A',
            description: 'Middle initial of requested driver'
        },
        RequestReference: {
            example: 'ref-desc',
            description: 'Memo field, free form.  This is displayed back on the Print format (if applicable) of the MVR.  This is also echoed back on billing backup file'
        },
        RequestComment: {
            example: 'vip client',
            description: 'Comment field, free form.  This is displayed back on the Print format (if applicable) of the MVR.'
        },
        DuplicateCheckOrderOverrideInd: {
            example: 'Y',
            description: 'N to determine if a duplicate exists or not.'
        },
        PredictorCheckOverrideInd: {
            example: 'N',
            description: 'If the MVR Predictor feature is applicable: Y – the call bypasses Predictor, and N – the call results on ordering an MVR'
        },
        AbstractFormat: {
            example: 'D',
            description: 'The response can be returned in various formats: Data only, formatted print or both. D, P, B'
        },
        SuspendAbstractResponseInd: {
            example: 'N',
            description: 'For internal CGI use.'
        },
        ExplicitRequestResponsePoolInd: {
            example: 'N',
            description: 'For internal CGI use.'
        },
        ConsentType: {
            example: 'M',
            description: 'For QC use only M or E or V'
        },
        Language: {
            example: 'E',
            description: 'For QC use only E or F'
        },
        SignatureCode: {
            example: 'E12324454',
            description: 'For QC use only, 9 characters all filled.'
        }

    },

    defaultExit: 'success',

    exits: {

        error: {
            description: 'An unexpected error occurred.'
        },

        success: {
            result: 'MVR JOSN Object'
        }

    },

    fn: function (inputs, exits) {

        // Module Dependencies
        const soap = require('soap');

        /** request args */
        const url = inputs.Url;

        // set request headers.
        const headers = {
            "Credentials": {
                "UserName": inputs.UserName,
                "Password": inputs.Password
            },
            "CredentialsContext": {
                "SponsorSubscriberId": inputs.SponsorSubscriberID
            }
        };

        // set request body.
        const body = {

            "MVRRequestDS": {
                "attributes": {
                    "xmlns": "http://localhost/IISDOTNETAPP/XMLSchemas/MVRRequestDS.xsd"
                },
                "MVRRequestDT": {
                    "DriverLicenceProvinceCode": inputs.DriverLicenceProvinceCode,
                    "DriverLicenceNumber": inputs.DriverLicenceNumber,
                    "OrderImmediateInd": inputs.OrderImmediateInd || 'Y',
                    "DriverDateOfBirth": inputs.DriverDateOfBirth,
                    "DriverGender": inputs.DriverGender,
                    "DriverFirstName": inputs.DriverFirstName,
                    "DriverLastName": inputs.DriverLastName,
                    "DriverMiddleName": inputs.DriverMiddleName,
                    "RequestReference": inputs.RequestReference,
                    "RequestComment": inputs.RequestComment,
                    "PredictorCheckOverrideInd": inputs.PredictorCheckOverrideInd || 'Y',
                    "DuplicateCheckOrderOverrideInd": inputs.DuplicateCheckOrderOverrideInd || 'Y',
                    "AbstractFormat": inputs.AbstractFormat || 'D',
                    "SuspendAbstractResponseInd": inputs.SuspendAbstractResponseInd || 'N',
                    "ExplicitRequestResponsePoolInd": inputs.ExplicitRequestResponsePoolInd,
                    "ConsentType": inputs.ConsentType,
                    "Language": inputs.Language,
                    "SignatureCode": inputs.SignatureCode
                }
            }

        };

        // create soap client.
        soap.createClient(url, (err, client) => {
            if (err) return exits.error(err);
            
            // add headers to the client object.
            client.addSoapHeader(headers);

            // make a service call to the soap method SubmitRequest.
            client.SubmitRequest(body, (err, result, raw) => {
                if (err) return exits.error(err);
                result.raw = raw;
                return exits.success(result);
            });

        });

    }

};