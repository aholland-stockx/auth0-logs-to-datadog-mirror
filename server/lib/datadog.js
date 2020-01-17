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

  return axios.post(`https://http-intake.logs.datadoghq.com/v1/input/${config.apiKey}`, logs, {
    headers: {
      'Content-Type': 'application/json'
    },
    qs: {
      ddsource: config.source,
      hostname: config.hostname,
      service: 'auth0'
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
