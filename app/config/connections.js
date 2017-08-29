/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
  *                                                                          *
  * MySQL is the world's most popular relational database.                   *
  * http://en.wikipedia.org/wiki/MySQL                                       *
  *                                                                          *
  * Run: npm install sails-mysql                                             *
  *                                                                          *
  ***************************************************************************/
  // someMysqlServer: {
  //   adapter: 'sails-mysql',
  //   host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_MYSQL_USER', //optional
  //   password: 'YOUR_MYSQL_PASSWORD', //optional
  //   database: 'YOUR_MYSQL_DB' //optional
  // },

  /***************************************************************************
  *                                                                          *
  * MongoDB is the leading NoSQL database.                                   *
  * http://en.wikipedia.org/wiki/MongoDB                                     *
  *                                                                          *
  * Run: npm install sails-mongo                                             *
  *                                                                          *
  ***************************************************************************/
  myMongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    // user: 'username', //optional
    // password: 'password', //optional
    database: 'cgi' //optional
  },
  mongoDev: {
    url: process.env.MONGO_URL,
    host: process.env.MONGO_SERVER || 'localhost',
    port: 27017,
    user: 'cgidev',
    password: '863cb08a86e8e23721f89aaa63e49d2438816968752ce363391d9a089090884d',
    database: 'cgidev'
  },

  redis: {
    adapter: "sails-ioredis",
    port: 6379,
    host: process.env.REDIS_SERVER || 'localhost',
    password: process.env.REDIS_CLUSTER_URL ? undefined : 'f288198d9d1ba43ad6ed958dee83b68da7350ae4e12bf22273323725cacb630a',
    // USING WITH CLUSTER
    
    hosts: (function () {
      if (!process.env.REDIS_CLUSTER_URL) return null;
      var hosts = process.env.REDIS_CLUSTER_URL.split(' ');
      var cluster = hosts.map(function (host) {
        if (!typeof host === 'string' || host.length < 1) return;
        var str = host.split(':');
        var url = '';
        var port = 6379;
        if (Array.isArray(str) && str.length > 0) {
          url = str[0];
          if (str.length > 1)
            port = parseInt(str[1]);
        
          return { host: url, port: port };
        }
      });
      console.log('redis cluster configuration found!');
      return cluster;
    })()
  }

  /***************************************************************************
  *                                                                          *
  * PostgreSQL is another officially supported relational database.          *
  * http://en.wikipedia.org/wiki/PostgreSQL                                  *
  *                                                                          *
  * Run: npm install sails-postgresql                                        *
  *                                                                          *
  *                                                                          *
  ***************************************************************************/
  // somePostgresqlServer: {
  //   adapter: 'sails-postgresql',
  //   host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_POSTGRES_USER', // optional
  //   password: 'YOUR_POSTGRES_PASSWORD', // optional
  //   database: 'YOUR_POSTGRES_DB' //optional
  // }

  


  /***************************************************************************
  *                                                                          *
  * More adapters: https://github.com/balderdashy/sails                      *
  *                                                                          *
  ***************************************************************************/

};
