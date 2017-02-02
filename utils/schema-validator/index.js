/**
 * this module will send MVR/A+ requests
 * to all given licences, the result will
 * be a list of paths to all the Arrays,
 * collected from all the responses. 
 * in other words, you'll know which fields
 * should be Array.
 * set isMVR flag to true if you wanna get MVR responses,
 * otherwise it'll get A+ responses.
 * Add as many test cases as you want,
 * the results will be on list that covers all returned responses.
 * just => node index
 * note: if you set the flag 'everything' to true, you'll get
 * all the response not just array fields.
 * 
 * Args: 
 * -m request mvr, the default is autoplus.
 * -all get the full response the default is to arrays only.
 * -num=4 control how many requests you wanna make.
 */

var request = require('request');
var _ = require('lodash');
var iterator = require('object-recursive-iterator');
var fs = require('fs');
var autoPlusMachine = require('./machinepack-autoplus');
var mvrMachine = require('./machinepack-mvr');

var isMVR = false; // true => you'll request MVR, false => you'll request A+
var everything = false; // true => get everything, false => get arrays only
var reqNum = 0;

// check for args
if (process.argv.length > 2) {

    _.each(process.argv, function(arg) {
        if (arg == '-m') isMVR = true;
        if (arg == '-all') everything = true;
        if (arg.match(/(-num=)\w+/g)) {
            reqNum = arg.split('=')[1];
        }
    });

}

console.log('You Requested ' + reqNum + ' ' + (isMVR ? 'MVR' : 'AutoPlus'));
console.log('the response includes ' + (everything ? ' all properties' : ' only arrays'));

var results = [];
var counter = 1;
var rescounter = 1;
var lics = [];
var requestCounter = 0;

function loadLicences () {
    fs.readFile('test-cases.json', (err, data) => {
        if (err) throw err;
        lics = JSON.parse(data);
        //lics = _.uniqBy(lics, 'licence');

        lics = lics.slice(0, (reqNum < 1) ? lics.length : (reqNum > lics.length ? lics.length : reqNum));

        start(lics);
    });
}

function getArrays (docJs) {

    var strInfo = '';
    var objInfoArray = [];

    iterator.forAll(docJs, function (path, key, object) {

        var pathStr = '';
        _.each(path, (pa) => (isNaN(pa) ? pathStr += pa + '.' : ''));
        pathStr = pathStr.slice(0, pathStr.length - 1);

        var arr = (Array.isArray(_.get(docJs, path)) ? true : false); 

        // get the parent, cuz if it's an array the iterator will go through its childeren only
        var parent = path.slice(0, path.length - 1);
        // check if the parent is array
        var parentArr = (Array.isArray(_.get(docJs, parent)) ? true : false);

        if (everything) objInfoArray.push(pathStr + '.' + key);
        else if (arr || parentArr) objInfoArray.push(pathStr);

    });

    objInfoArray = _.uniq(objInfoArray);

    _.each(objInfoArray, (obj) => results.push(obj));
    console.log('Responses: ', rescounter);
    if (rescounter == lics.length) {
        printToFile(_.uniq(results));
    }
    rescounter++;

}

function makeRequest (licence, province) {

    console.log('Send Request: ', ++requestCounter);

    if (!isMVR) {
        autoPlusMachine.GetDCHUsingLicence({
            Url: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/DriverClaimHistoryGoldWS.asmx?WSDL',
            UserName: 'ws.test@sharpinsurance.ca',
            Password: 'SharpTest1',
            LicenceProvinceCode: province,
            LicenceNumber: licence
        })
        .exec({
            success: function (body) {
                //console.log(body);
                var doc = body;
                getArrays(doc);
            },

            error: function (err) {
                rescounter++;
                console.log('Error');
            }
        });
    }
    else {
        mvrMachine.RequestMVR({
            Url: 'https://ibs.ct.rapidwebservices.cgi.com/rapidwebservices/WebServices/MVRWS.asmx?wsdl',
            UserName: 'ws.test@sharpinsurance.ca',
            Password: 'SharpTest1',
            DriverLicenceProvinceCode: province,
            DriverLicenceNumber: licence
        })
        .exec({
            success: function (body) {
                //console.log(body);
                var doc = body;
                getArrays(doc);
            },

            error: function (err) {
                rescounter++;
                console.log('Error');
            }
        });
    }


}

function start (licenceArray) {
    console.log('Start Sending ' + licenceArray.length +' '+ (isMVR ? ' MVR' : ' AutoPlus') + ' Requests');
    _.each(licenceArray, (lic) => {
        makeRequest(lic.licence, lic.province);
    });
}

function printToFile (res) {

    var str = '';
    var fileName = (isMVR ? (everything ? 'mvr-results-all.txt' : 'mvr-results.txt') : (everything ? 'autoplus-results-all.txt' : 'autoplus-results.txt'));
    _.each(res, (item) => str += item + '\n');

    fs.writeFile(fileName, str, (err) => console.log('Saved!'));

}

loadLicences();