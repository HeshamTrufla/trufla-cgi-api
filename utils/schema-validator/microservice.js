const request = require('request');
const _ = require('lodash');
const fs = require('fs');

let lics = [];
var resCounter = 0;

let loadLicences = () => {
    fs.readFile('test-cases.json', (err, data) => {
        if (err) throw err;
        lics = JSON.parse(data);
        lics = _.uniqBy(lics, 'licence');
        console.log('loaded licences', lics.length);
        _.each(lics, x => makeRequest(x));

    });
};

let makeRequest = ({ licence, province }) => {
    console.log('licence', licence);
    let options = {
        url: `http://localhost:8001/api/mvr/licence/${licence}?DriverLicenceProvinceCode=${province}`,
        headers: {
            'api_key': 'S33E89QP87BEE46WQ'
        }
    };

    function callback (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('Response Received', ++resCounter);
            if (resCounter === lics.length) console.log('Done');
        }
        else {
            console.log('Error'); ++resCounter;
            if (resCounter === lics.length) console.log('Done');
        }
    }

    request(options, callback);

};

loadLicences();