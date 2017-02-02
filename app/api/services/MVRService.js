const MVRMachine = require('./machinepack-mvr');
const ClientCBMachine = require('./machinepack-clientcb');
const cgiUrl = sails.config.cgi.MVR.URL;
const cgiUserName = sails.config.cgi.MVR.USER_NAME;
const cgiPassword = sails.config.cgi.MVR.PASSWORD;

module.exports = {

    // get MVR Document from Cach.
    findOneFromCache: function (reqParams) {
        return MVRRedis.findOne(reqParams);
    },

    // get MVR Document from DB.
    findOneFromDB: function (reqParams) {
        return db.MVR.findOne(reqParams);
    },

    // find one or more documents from DB.
    findFromDB: function (criteria) {
        return db.MVR.find(criteria);
    },
    
    findByIdAndUpdateDB: function (id, data, options) {
        return db.MVR.findByIdAndUpdate(id, data, options);
    },

    updateDB: function (criteria, data) {
        return db.MVR.update(criteria, data);
    },

    // get MVR Document from CGI.
    findOneFromCGI: function (reqParams) {

        // check if the client sent the province code.
        if (!reqParams.DriverLicenceProvinceCode)
            throw ResHandlerService.getMessage('PROVINCE_CODE_REQUIRED', true);

        // set request headers.
        reqParams.Url = cgiUrl;
        reqParams.UserName = cgiUserName;
        reqParams.Password = cgiPassword;
        // TODO: handle adding sponsor id.
        //reqParams.SponsorSubscriberID = '';

        // make a call to cgi - mvr service.
        return new Promise((resolve, reject) => {
            MVRMachine.RequestMVR(reqParams)
                .exec({
                    success: (result) => {
                        resolve(result);
                    },
                    error: (err) => {
                        reject(err);
                    }
                });
        });
    },

    // save requested MVR document in MongoDB.
    createInDB: function (mvrDoc) {
        return db.MVR.create(mvrDoc);
    },

    // save reference to the requested MVR Document in Redis Cache.
    createInCache: function (docInfo) {
        return MVRRedis.create(docInfo);
    },

    /**
     * this function will make async promise based calls to the MVRService
     * to get the MVR Document from CGI, and then insert the document in MonogoDB,
     * and put a reference for the MVR Document in the cache memory 'Redis'.
     */
    findOneFromCGIAndSave: function (reqParams) {
        var _mvrFromDB = null;

        return this.findOneFromCGI(reqParams)
            .then((mvrDoc) => ResHandlerService.MVR(mvrDoc)) // validate incoming MVR Document.
            .then((mvrObj) => {

                var mvrDoc = mvrObj.doc;
                var message = mvrObj.message;
                var isReady = false;

                if (message.INTERNAL_CODE === 'ABSTRACT_FOUND') isReady = true;

                var requestResult = _.get(mvrDoc, 'SubmitRequestResult.MVRRequestResponseDS');

                var dbDoc = {
                    DriverLicenceNumber: reqParams.DriverLicenceNumber,
                    MVRRequestResponseDS: requestResult,
                    Clients: [{ 
                        // TODO: Add Client API Key => 'MongoDB _id'
                        Callback: reqParams.Callback,
                        IsDelivered: isReady ? true : false
                    }],
                    IsReady: isReady ? true : false,
                    ReadyDate: isReady ? Date.now() : null
                };

                return this.createInDB(dbDoc);

            })
            .then((mvrFromDB) => {
                _mvrFromDB = mvrFromDB;
                return this.createInCache({ DriverLicenceNumber: mvrFromDB.DriverLicenceNumber, MVR_ID: mvrFromDB._id.toString() });
            })
            .then(() => _mvrFromDB);

    },

    /**
     * 1. load all not ready MVR Documents.
     * 2. put them in a queue so later we check each one.
     * 3. validate returned response.
     * 4. check if the returned MVR is ready => 'has abstract'.
     * 5. if abstract found, then update the original document.
     * 6. send the documents to all associated clients.
     */
    getRequestedMVRDocs: function () {

        var self = this;

        // get all MVR not ready documents from DB.
        self.findFromDB({ IsReady: false })
            // select only licence number, recipet number, and document id.
            .select('_id DriverLicenceNumber MVRRequestResponseDS.MVRRequestDT.RequestReceipt')
            .then((mvrDocs) => {

                if (!mvrDocs) {
                    sails.log.info('CGI - RequestReadyMVR Queue finished!');
                }

                // create a requests queue.
                var taskQueue = async.queue(self.getRequestedMVRTask);

                // push all not ready docs into the Queue.
                _.each((mvrDocs), (doc) => {

                    // only add documents with recipet number.
                    if (doc.MVRRequestResponseDS 
                    && doc.MVRRequestResponseDS.MVRRequestDT 
                    && doc.MVRRequestResponseDS.MVRRequestDT.RequestReceipt) {
                            
                        var taskObj = {
                            RequestReceipt: doc.MVRRequestResponseDS.MVRRequestDT.RequestReceipt,
                            DriverLicenceNumber: doc.DriverLicenceNumber,
                            _id: doc._id
                        };
                        taskQueue.push(taskObj); 

                    }

                });

                taskQueue.drain = function () {
                    sails.log.info('CGI - RequestReadyMVR Queue finished!');
                }

            });

    },

    getRequestedMVRTask: function (task, cb) {

        // check with CGI if this MVR Document is Ready or not.
        this.checkReadyMVR(task.RequestReceipt)
            .then((mvrDoc) => {

                // validate incoming MVR Document.
                if (!mvrDoc) {
                    sails.log.error('while trying to retrive the requested MVR Document', 'No mvr document returned!');
                    return false;
                }
                
                // TODO: we should check for CGI messages, to either keep this document in a not ready status or delete it.
                if (!mvrDoc.GetResponseResult || !mvrDoc.GetResponseResult.MVRRequestResponseDS) {
                    sails.log.error('while trying to retrive the requested MVR Document', 'returned MVR Document doesn\'t contain a result!');
                    return false;
                }

                var requestResult = mvrDoc.GetResponseResult.MVRRequestResponseDS;

                // check if we got an abstract or not.
                var isReady = requestResult.DataFormatAbstractDT ? true : false;

                // if no abstract returned => still not ready, then skip to the next Task.
                if (!isReady) {
                    sails.log.error('while trying to retrive the requested MVR Document', requestResult.MessageDT.Text);
                    return false;
                }

                // otherwise, we'll first update the Document in DB and then send it back to the client.
                return this.findByIdAndUpdateDB(task._id, { $set: { MVRRequestResponseDS: mvrDoc.GetResponseResult.MVRRequestResponseDS, IsReady: true } }, { new: true });

            })
            .then((newMVR) => {

                if (!newMVR) return false;

                // TODO: got a new mvr abstract, now send to client.
                
                return true;

            })
            .then(() => {
                cb();
            })
            .catch((err) => {
                sails.log.error('while trying to retrive the requested MVR Document', err);
                cb(); // contunie to next task.
            });

    },

    checkReadyMVR: function (requestReceipt) {
        
        var reqParams = {};
        // set request headers.
        reqParams.Url = cgiUrl;
        reqParams.UserName = cgiUserName;
        reqParams.Password = cgiPassword;
        // TODO: handle adding sponsor id.
        //reqParams.SponsorSubscriberID = '';
        reqParams.RequestReceipt = requestReceipt;

        // make a call to cgi - mvr service.
        return new Promise((resolve, reject) => {
            MVRMachine.GetRequestedMVR(reqParams)
                .exec({
                    success: (result) => {
                        resolve(result);
                    },
                    error: (err) => {
                        reject(err);
                    }
                });
        });

    },

    /**
     * this will load all ready but,
     * not yet received by requested clients,
     * and then sending them on the corresponding callbacks.
     */
    sendReadyMVRDocs: function () {
        db.MVR
            .where('IsReady').equals(true)
            .where('Clients').elemMatch({ IsDelivered: false })
            .then((mvrDocs) => this.sendDocsToClients(mvrDocs))
            .catch((err) => sails.log.error(err));
    },

    /**
     * 1. loop the given MVR Document.
     * 2. loop clients inside each Document.
     * 3. push all clients who didn't receive the document into the Task Queue.
     */
    sendDocsToClients: function (mvrDocs) {
        
        // create a task queue.
        var taskQueue = async.queue(this.sendDocToClientTask);

        _.each((mvrDocs), (mvrDoc) => {

            _.each(mvrDoc.Clients, (client) => {

                // TODO: omit clients who has maximum number of retries.
                if (!client.IsDelivered && client.Callback) {

                    var taskObj = {
                        clientUrl: client.Callback,
                        mvrDoc: mvrDoc,
                        clientId: client._id
                    };
                    taskQueue.push(taskObj); 

                }

            });

        });

        // function to call after all tasks completed.
        taskQueue.drain = function () {
            sails.log.info('CGI - SendDocsToClients Queue finished!');
        }

    },

    /**
     * Send MVR Document to the requested Client,
     * and update it's status according to it.
     */
    sendDocToClientTask: function (task, cb) {

        var self = this;

        ClientCBMachine.callClient({
            url: task.clientUrl,
            data: task.mvrDoc
        })
        .exec({
            success: (result) => {
                // update this client status
                self.updateDB(
                    { _id: task.mvrDoc._id, 'Clients._id': task.clientId }, 
                    { $set: { 'Clients.$.IsDelivered': true } }
                )
                .then(() => {
                    cb();
                })
                .catch((err) => {
                    sails.log.error('while trying to update Client status:', err);
                    cb();
                });
            },
            error: (err) => {

                sails.log.error('while trying to send mvr to client', err);
                
                // add 1 to the client RetriesNumber.
                self.updateDB(
                    { _id: task.mvrDoc._id, 'Clients._id': task.clientId }, 
                    { $inc: { 'Clients.$.RetriesNumber': 1 } }
                )
                .then(() => {
                    cb();
                })
                .catch((err) => {
                    sails.log.error('while trying to update Client status:', err);
                    cb();
                });

            }
        });

    },

    addClientToDoc: function (mvrId, clientInfo) {
        return db.MVR.update({ _id: mvrId }, { $push: { Clients: clientInfo } });
    }

};