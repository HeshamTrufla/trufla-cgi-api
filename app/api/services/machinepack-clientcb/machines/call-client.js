module.exports = {

    friendlyName: 'Client CB',

    description: 'make call to a given client on the given callback url to send scheduled data',

    inputs: {

        url: {
            example: 'http://www.broker-company.com/api/mvr/response',
            description: 'the callback url, given by the client.',
            required: true
        },
        data: {
            example: {},
            description: 'requested data',
            required: true
        }

    },

    defaultExit: 'success',

    exits: {

        error: {
            description: 'An unexpected error occurred.'
        },

        success: {
            result: 'client response'
        }
        
    },

    fn: function (inputs, exits) {

        /**
         * Module Dependencies
         */
        var request = require('request');

        request.post(inputs.url, inputs.data, (err, res, body) => {
            console.log('Client Callback Result', body);
            if (err) return exits.error(err); 
            return exits.success(res.statusCode);
        });

    }

};
