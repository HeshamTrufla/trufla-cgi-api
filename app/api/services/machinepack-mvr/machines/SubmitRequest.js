module.exports = {

    friendlyName: 'MVR',

    description: 'cgi - mvr service integrator, to make requests and convert the returned xml response into json',

    extendedDescription: 'cgi - mvr service integrator, to make requests and convert the returned xml response into json ',

    inputs: {
        Url: {
            example: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/MVRWS.asmx?wsdl',
            required: true
        },
        UserName: {
            example: 'ws.test@sharpinsurance.ca',
            required: true
        },
        Password: {
            example: 'SharpTest1',
            required: true
        },
        DriverLicenceProvinceCode: {
            example: 'ON',
            description: 'Licence province code',
            required: true
        },
        DriverLicenceNumber: {
            example: 'W35125910545606',
            description: 'Client Licence Number',
            required: true
        },
        OrderImmediateInd: {
            example: 'Y'
        },
        PredictorCheckOverrideInd: {
            example: 'N'
        },
        DuplicateCheckOrderOverrideInd: {
            example: 'Y'
        },
        AbstractFormat: {
            example: 'D'
        },
        SuspendAbstractResponseInd: {
            example: 'N'
        }

    },

    defaultExit: 'success',

    exits: {

        error: {
            description: 'An unexpected error occurred.'
        },

        success: {
            result: 'cgi results'
        }
    },

    fn: function (inputs, exits) {

        /**
         * Module Dependencies
         */
        const soap = require('soap');
        
        /**
         * request args
         */
        const url = inputs.Url;
        
        const headers = {
            "Credentials": {
                "UserName": inputs.UserName,
                "Password": inputs.Password
            }
        };

        const args = {

            "MVRRequestDS": {
                "attributes": {
                    "xmlns": "http://localhost/IISDOTNETAPP/XMLSchemas/MVRRequestDS.xsd"
                }, 
                "MVRRequestDT": {
                    "DriverLicenceProvinceCode": inputs.DriverLicenceProvinceCode,
                    "DriverLicenceNumber": inputs.DriverLicenceNumber,
                    "OrderImmediateInd": inputs.OrderImmediateInd || 'Y',
                    "PredictorCheckOverrideInd": inputs.PredictorCheckOverrideInd || 'Y',
                    "DuplicateCheckOrderOverrideInd": inputs.DuplicateCheckOrderOverrideInd || 'Y',
                    "AbstractFormat": inputs.AbstractFormat || 'D',
                    "SuspendAbstractResponseInd": inputs.SuspendAbstractResponseInd || 'N'
                }
            }

        };

        soap.createClient(url, function(err, client) {
            if (err) return exits.error(err);

            client.addSoapHeader(headers);
            
            client.SubmitRequest(args, function(err, result) {
                if (err) return exits.error(err);

                return exits.success(result);
            });
            

        });

    }

};