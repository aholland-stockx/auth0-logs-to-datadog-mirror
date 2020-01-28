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
    var date, id;
    for (var i in logs) {
        date = logs[i].date
        id = logs[i].log_id
        console.log(`${id}:\t${date}`) 
    }

    return axios.post(postaddr, logs, {
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
        console.log(`last id:\t${id}`)
        console.log(`last date:\t${date}`)
        console.log(`cur:\t${cur.toISOString()}`)
    }).catch(error => {
        console.log('Error');
        console.log(error);
    });
};

module.exports = DataDog;
