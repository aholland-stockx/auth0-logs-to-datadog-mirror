const axios = require('axios');

const metadata = {
    ddsourcecategory: 'external',
    ddsource: 'auth0'
};

const config = {};

function DataDog(apiKey, source, hostname) {

    if (!apiKey) {
        throw new Error('API Key is required for DataDog.');
    }

    config.apiKey = apiKey;
    config.source = source;
    config.hostname = hostname;
}

DataDog.prototype.log = (logs) => {

    console.log(config.source);
    console.log(config.hostname);

    var postaddr = `https://http-intake.logs.datadoghq.com/v1/input/${config.apiKey}`

    var cur = new Date()
    console.log(`cur:\t${cur.toISOString()}`)

    for(var log in logs) {
        date = log["date"]
        id = log["id"]
        console.log(`${id}:\t${date.toISOString()}`)
    }

    return axios.post(postaddr, json, {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            ddsource: config.source,
            hostname: config.hostname,
            service: 'auth9'
        }
    }).then(response => {
        console.log('Worked');
        console.log(response.status);
    }).catch(error => {
        console.log('Error');
        console.log(error);
    });
};

module.exports = DataDog;
