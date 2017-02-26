module.exports = {


    friendlyName: 'MVR - GetRequestedMVR',

    description: 'This method provides authorized users to view the MVR for an MVR request by the MVR request receipt number.',

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
        FederatedUserName: {
            example: 'ws.test@sharpinsurance.ca',
            description: ''
        },
        FederatedPassword: {
            example: 'SharpTest1',
            description: ''
        },
        SponsorSubscriberID: {
            example: '12345',
            description: 'The subscriber id of the Insurance company paying for the service.'
        },
        RequestReceipt: {
            example: '100410',
            description: 'A token returned. -  Unique id of the transaction in Rapidweb',
            required: true
        },
        AbstractFormat: {
            example: 'D',
            description: 'The response can be returned in various formats: Data only, formatted print or both. D, P, B'
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
            "FederatedContext": {
                "SponsorSubscriberId": inputs.SponsorSubscriberID
            },
            "FederatedCredentials": {
                "UserName": inputs.FederatedUserName,
                "Password": inputs.FederatedPassword
            }
        };

        // set request body
        const body = {

            "MVRResponseRequestDS": {
                "attributes": {
                    "xmlns": "http://localhost/IISDOTNETAPP/XMLSchemas/MVRResponseRequestDS.xsd"
                },
                "MVRResponseRequestDT": {
                    "RequestReceipt": inputs.RequestReceipt,
                    "AbstractFormat": inputs.AbstractFormat,
                }
            }

        };

        // create soap client.
        soap.createClient(url, (err, client) => {
            if (err) return exits.error(err);

            // add headers to the client object.
            client.addSoapHeader(headers, "", "tns", "https://RapidWebServices.cgi.com/WebServices");

            // make a service call to the soap method GetResponse.
            client.GetResponse(body, (err, result, raw) => {
                if (err) return exits.error(err);
                result.raw = raw;
                return exits.success(result);
            });

        });

    }


};