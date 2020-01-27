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

    var test = {"date":"2019-12-25T19:31:05.657Z","type":"feccft","description":"Unauthorized","connection_id":"","client_id":"1EUxegNhKI7UTelEGkaTnl4sljOFXUz5","client_name":null,"ip":"35.160.3.103","user_agent":"Other 0.0.0 / Other 0.0.0","details":{"device_id":"v0:17faf830-274d-11ea-9528-6759a37739cd"},"hostname":"stockx-staging.auth0.com","user_id":"","user_name":"","audience":"https://stockx-staging.auth0.com/api/v2/","scope":null,"log_id":"90020191225193109813000852820998500973574084845960691826","_id":"90020191225193109813000852820998500973574084845960691826","isMobile":false}

    try {
        var json = JSON.parse(JSON.stringify(test))
    }
    catch(error) {
        console.error(error)
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
