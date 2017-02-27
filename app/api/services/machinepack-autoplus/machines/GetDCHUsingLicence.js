module.exports = {

  friendlyName: 'AutoPlus - GetDCHUsingLicence',

  description: 'AutoPlus GOLD enables clients to view the claim history of a driver and all his or her policies. Information is retrieved based on the driver\'s licence.',

  extendedDescription: 'AutoPlus - GetDCHUsingLicence GOLD enables clients to view the claim history of a driver and all his or her policies. Information is retrieved based on the driver\'s licence.',

  inputs: {

    Url: {
      example: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/DriverClaimHistoryGoldWS.asmx?WSDL',
      required: true,
      description: ''
    },
    UserName: {
      example: 'ws.test@sharpinsurance.ca',
      required: true,
      description: ''
    },
    Password: {
      example: 'SharpTest1',
      required: true,
      description: ''
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
    ProvinceCode: {
      example: 'AB',
      required: true,
      description: 'The jurisdiction of the driver’s licence number.'
    },
    LicenceNumber: {
      example: '146252-598',
      required: true,
      description: 'Requested licence number'
    },
    RequestReference: {
      example: '',
      description: 'User Memo Field.'
    },
    Identifier: {
      example: '',
    },
    Insured: {
      example: '',
      description: 'User Memo Field for Insured'
    },
    OverrideYearLimitFeature: {
      example: 'NO'
    },
    ExplicitRequestResponsePoolInd: {
      example: 'N',
      description: ''
    },
    AbstractFormat: {
      example: 'D',
      description: 'Data or Data/Print format to be returned in the response xml'
    },
    AutoFillRequestInd: {
      example: 'N',
      description: 'AutoFill Request Indicator'
    },
    AutoFillRequestReceipt: {
      example: '0',
      description: 'AutoFill Request receipt'
    },

  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'An unexpected error occurred.'
    },

    success: {
      result: 'autoplus result'
    }
  },

  fn: function (inputs, exits) {

    /**
     * Module Dependencies
     */
    const soap = require('soap');


    /**
     * Request Arguments
     */

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
    //,"","","https://RapidWebServices.cgi.com/WebServices"

    // set request body.
    const body = {
      DriverClaimHistoryGoldRequestDS: {
        RequestParametersDT: {
          LicenceProvinceCode: inputs.ProvinceCode,
          LicenceNumber: inputs.LicenceNumber,
          RequestReference: inputs.RequestReference || '',
          Identifier: inputs.Identifier || '',
          Insured: inputs.Insured || '',
          OverrideYearLimitFeature: inputs.OverrideYearLimitFeature || 'NO',
          ExplicitRequestResponsePoolInd: inputs.ExplicitRequestResponsePoolInd || 'N',
          AbstractFormat: inputs.AbstractFormat || 'D',
          AutoFillRequestInd: inputs.AutoFillRequestInd || 'N',
          AutoFillRequestReceipt: inputs.AutoFillRequestReceipt || '0'
        }
      }
    };

    soap.createClient(url, (err, client) => {

      client.addSoapHeader(headers,"","tns","https://RapidWebServices.cgi.com/WebServices");

      client.GetDCHUsingLicence(body, (err, result, raw) => {
        if (err) return exits.error(err);
        result.raw = raw;
        return exits.success(result);
      });

    });

  }

};
