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

var fs=require('fs');

//This code is a work around to load all the ca chain certificates because NodeJs only see the first certificate in the chain
var ca=[];
var chain=fs.readFileSync(__dirname + '/../ssl/fullchain.pem');
chain= chain.toString().split("\n");
var cert=[];
for(line=0; line < chain.length; line++ ){
	cert.push(chain[line]);
	if(chain[line].match(/-END CERTIFICATE-/))
	{
		ca.push(cert.join("\n"));
		cert=[];
	}
}


module.exports = {
  
    /***************************************************************************
     * Set the default database connection for models in the development       *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/
  
    // models: {
    //   connection: 'someMongodbServer'
    // }
    port: 80,

    // ssl: {
    //   ca: ca,
    //   key: fs.readFileSync(__dirname + '/../ssl/privkey.pem'),
    //   cert: fs.readFileSync(__dirname + '/../ssl/cert.pem'),
    // },

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
        cost: 9
      },
      AutoPlus: {
        URL: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/DriverClaimHistoryGoldWS.asmx?WSDL',
        cost: 7.12
      }
  
    }
  
  };
  