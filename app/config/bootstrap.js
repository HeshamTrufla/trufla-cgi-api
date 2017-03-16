/*jshint esversion: 6 */
/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var Promise = require('bluebird');
var glob = Promise.promisify(require('glob'));
var path = require('path');
var mongoose = require('mongoose');
var schedule = require('node-schedule');
// var _ = require('lodash');
mongoose.Promise = Promise;

/**
 * connect mongoose to db
 * @return {promise} [successful promise]
 */
var connectMongoose = function () {
  const dbConnection = 'mongoDev';
  const connConfigs = sails.config.connections[dbConnection];
  var mongoUrl = connConfigs.url ? connConfigs.url : connConfigs.user ? 'mongodb://' + connConfigs.user + ':' + connConfigs.password + '@' + connConfigs.host + ':' + connConfigs.port + '/' + connConfigs.database + '?authSource=admin' : 'mongodb://' + connConfigs.host + ':' + connConfigs.port + '/' + connConfigs.database;

  // initialize mongoose to mongodb connection
  mongoose.connect(mongoUrl);
  // mongoose.createConnection(mongoUrl);

  var db = mongoose.connection;
  Promise.promisifyAll(db);

  db.onAsync('error')
    .then(function () {
      console.error.bind(console, 'Mongoose connection error:');
      throw new Error('Mongoose connection error');
    });

  return db.onceAsync('open')
    .then(function () {
      console.log('Connected Mongoose to', mongoUrl);
    });
};

/**
 * bind promisified mongoose functions to Model.mongoose. doing this in
 * bootstrap because waterline does something to functions in its build
 * phase (probably promisifying them)
 */
function bindMongooseToModels() {
  return glob("api/collections/*.js")
    .then(function (files) {
      var models = [];
      global.db = {};
      _.each(files, function (file) {
        var model = path.basename(file, '.js');
        console.log('file :', file);
        console.log('initing mongoose schema for model', model);
        // define lowercase model names
        var lowerCaseModelName = model.toLowerCase();
        // get model object
        // var Model = sails.models[lowerCaseModelName];
        var Model = require('../' + file);
        // get mongoose schema
        var schema = Model.schema;

        // if no schema, move to the next model
        if (!schema) return;

        // add __label to mongoose models if in unit testing mode
        if (process.env.NODE_ENV === 'testing') {
          schema.add({
            __label: String
          });
        }

        // set schema collection name
        schema.set('collection', lowerCaseModelName);

        // declare mongoose model
        var mongooseModel = mongoose.model(model, schema);

        // append promisifed mongoose model to global db object
        db[model] = mongooseModel;
      });
    }) // .then
    .catch(console.error);
}

/**
 * update MVR Redis on bootstrapping,
 * to reflect the same data as Mongo.
 */
function updateMVRRedis() {
  return MVRRedis.destroy({})
    .then(() => {
      // get only the required fields by redis, from MongoDB.
      return db.MVR.find({}).select('DriverLicenceNumber ProvinceCode _id');
    })
    .then((mvrDocs) => {

      var refs = _.map(mvrDocs, (doc) => {
        return {
          DriverLicenceNumber: doc.DriverLicenceNumber,
          ProvinceCode: doc.ProvinceCode,
          MVR_ID: doc._id.toString()
        };
      });
      return MVRRedis.create(refs);

    });
}

/**
 * update AutoPlus Redis on bootstrapping,
 * to reflect the same data as Mongo.
 */
function updateAutoPlusRedis() {
  return AutoPlusRedis.destroy({})
    .then(() => {
      // get only the required fields by redis, from MongoDB.
      return db.AutoPlus.find({}).select('LicenceNumber ProvinceCode _id');
    })
    .then((autoPlusDoc) => {

      var refs = _.map(autoPlusDoc, (doc) => {
        return {LicenceNumber: doc.LicenceNumber, ProvinceCode: doc.ProvinceCode, autoPlusId: doc._id.toString()};
      });
      return AutoPlusRedis.create(refs);

    });
}

// START CRON JOBS.
function startCrons() {

  schedule.scheduleJob('0 */3 * * *', function () {
    MVRService.getRequestedMVRDocs();
  });

  schedule.scheduleJob('30 */3 * * *', function () {
    MVRService.sendReadyMVRDocs();
  });
}

function loadApiKeys() {
  return db.ApiKey.find({}).populate('accessPrivillage')
    .then((apiKeys) => {
      sails.config.apiKeys = apiKeys;
      sails.log.info(apiKeys.length, 'API Keys Loaded!');
      return true;
    })
    .catch((err) => {
      sails.log.error('error loading api keys', err);
      return false;
    });
}

function createTestKey() {
  //Check for API Key before creation
  var testKey = process.env.NODE_ENV === 'production' ? 'MN98R34Q4CPO56UT' : 'S33E89QP87BEE46WQ';
  db.ApiKey.findOne({key: testKey}).then((apiKey) => {
    if (!apiKey) {
      return db.AccessPrivillage.create({
        read: [{table: 'mvr'}, {table: 'autoplus'}],
        write: [{table: 'mvr'}, {table: 'autoplus'}]
      }).then((accessSet) => db.ApiKey.create({
        key: testKey, totalCost: 0, "sponsors": [{
          id: "100410",
          name: "Aviva",
          percent: 0.55,
          totalCost: 0
        },
          {
            id: "100410",
            name: "Intact",
            percent: 0.30,
            totalCost: 0,
            mvr: true,
            autoplus: true
          },
          {
            id: "100410",
            name: "RSA",
            percent: 0.10,
            totalCost: 0,
            mvr: true,
            autoplus: true
          },
          {
            id: "100410",
            name: "RSA Facility",
            percent: 0.03,
            totalCost: 0,
            mvr: true,
            autoplus: true
          },
          {
            id: "100410",
            name: "Pembridge",
            percent: 0.02,
            totalCost: 0,
            mvr: true,
            autoplus: true
          }
        ], accessPrivillage: accessSet._id
      }))
        .catch((err) => sails.log.error(err));
    }
  });
}

module.exports.bootstrap = function (cb) {
  connectMongoose()
    .then(bindMongooseToModels)
    .then(updateMVRRedis)
    .then(updateAutoPlusRedis)
    .then(createTestKey) // api_key => S33E89QP87BEE46WQ
    .then(loadApiKeys)
    .then(function () {

      startCrons();

      // Illustrative example
      /*db.ApiKey.create({
       Key: 'sdasadsda'
       })
       .then(function(ApiKey) {
       console.log('ApiKey: ', ApiKey);
       })
       .catch(function(err) {
       console.log('er: ', err);
       });*/
      return cb();
    });
};
