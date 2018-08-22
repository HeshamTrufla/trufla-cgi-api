/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }
  orm: {_hookTimeout: 120000},

  cgi: {
    Credentials: {
      USER_NAME: 'ws.test@sharpinsurance.ca',
      PASSWORD: 'SharpTest1'
    },
    FederatedCredentials: {
      USER_NAME: 'ws.test@sharpinsurance.ca',
      PASSWORD: 'SharpTest1'
    },
    MVR: {
      URL: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/MVRWS.asmx?wsdl',
      cost: 16.5
    },
    AutoPlus: {
      URL: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/DriverClaimHistoryGoldWS.asmx?WSDL',
      cost: 6.45
    }

  }

};
