module.exports = {


    friendlyName: 'MVR - GetResponse',

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
            description: 'The response can be returned in various formats: Data only, formatted print or both. D, P, B',
            required: true
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


    fn: function(inputs, exits) {

        // Module Dependencies
        const soap = require('soap');
        
         /** request args */
        const url = inputs.Url;
        
        // set headers.
        var headers = {
            "Credentials": {
                "UserName": inputs.UserName,
                "Password": inputs.Password
            },
            "CredentialsContext": {
                "SponsorSubscriberId": inputs.SponsorSubscriberID
            }
        };

        var args = {

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
        soap.createClient(url, function(err, client) {
            if (err) return exits.error(err);

            // add headers to the client object.
            client.addSoapHeader(headers);
            
            // make a service call to the soap method GetResponse.
            client.GetResponse(args, function(err, result) {
                if (err) return exits.error(err);
                return exits.success(result);
            });
            
        });

    }



};