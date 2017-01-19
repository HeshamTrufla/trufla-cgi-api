module.exports = {

  friendlyName: 'AutoPlus - GetDCHUsingLicence',

  description: 'AutoPlus GOLD enables clients to view the claim history of a driver and all his or her policies. Information is retrieved based on the driver\'s licence.',

  extendedDescription: 'AutoPlus - GetDCHUsingLicence GOLD enables clients to view the claim history of a driver and all his or her policies. Information is retrieved based on the driver\'s licence.',

  inputs: {

    Url: {
      example: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/MVRWS.asmx?wsdl',
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
    LicenceProvinceCode: {
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

    const url = inputs.Url;

    const headers = {
      "Credentials": {
        "UserName": inputs.UserName,
        "Password": inputs.Password
      }
    };

    const args = {
      GetDCHUsingLicence: {
        DriverClaimHistoryGoldRequestDS: {
          RequestParametersDT: {
            LicenceProvinceCode: inputs.LicenceProvinceCode,
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
      }
    };

    soap.createClient(url, function (err, client) {

      client.addSoapHeader(headers);

      client.GetDCHUsingLicence(args, function (err, result) {
        if (err) return exits.error(err);

        return exits.success(result);
      });
    });


  }

};
