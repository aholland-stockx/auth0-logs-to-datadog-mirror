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

    return axios.post(postaddr, logs, {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            ddsource: config.source,
            hostname: config.hostname,
            service: 'auth0'
        }
    }).then(response => {
        console.log("Successfully sent logs")
        const last = logs.length - 1
        console.log(`last id:\t${logs[last].id}`)
        console.log(`last date:\t${logs[last].date}`)
    }).catch(error => {
        console.log('Error');
        console.log(error);
    });
};

module.exports = DataDog;
