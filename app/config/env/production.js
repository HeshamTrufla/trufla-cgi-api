/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */
var fs=require('fs');

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  port: 443,

  // Your SSL certificate and key, if you want to be able to serve HTTP responses
  // over https:// and/or use websockets over the wss:// protocol
  // (recommended for HTTP, strongly encouraged for WebSockets)
  //
  // In this example, we'll assume you created a folder in your project, `config/ssl`
  // and dumped your certificate/key files there:
  ssl: {
    ca: fs.readFileSync(__dirname + '/../ssl/fullchain.pem'),
    key: fs.readFileSync(__dirname + '/../ssl/privkey.pem'),
    cert: fs.readFileSync(__dirname + '/../ssl/cert.pem'),
  },

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  log: {
     level: "error"
  },

  cgi: {
    Credentials: {
      USER_NAME: process.env.CREDENTIALS_USER_NAME,
      PASSWORD: process.env.CREDENTIALS_PASSWORD
    },
    FederatedCredentials: {
      USER_NAME: process.env.FEDERATED_USER_NAME,
      PASSWORD: process.env.FEDERATED_PASSWORD
    },
    MVR: {
      URL: 'https://rapidwebservicespilot.cgi.com/rapidwebservices/WebServices/MVRWS.asmx',
      cost: 9
    },
    AutoPlus: {
      URL: 'https://rapidwebservicespilot.cgi.com/rapidwebservices/WebServices/DriverClaimHistoryGoldWS.asmx',
      cost: 7.12
    }
  }

};
