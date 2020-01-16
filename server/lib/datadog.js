const tls = require('tls');
const logger = require('./logger');
const axios = require('axios');

const metadata = {
  ddsourcecategory: 'external',
  ddsource: 'auth0'
};

const config = {};

function DataDog(server, apiKey, customTags) {
  if (!apiKey) {
    throw new Error('API Key is required for DataDog.');
  }

  config.apiKey = apiKey;

  if (customTags) {
    const matchedTags = customTags.match(/([^:|^,\W]+):([^,|^\W]+)/g);
    if (!matchedTags || matchedTags.length < 1) {
      throw new Error('Custom tags are not formatted properly. Format is comma-separated key:value.');
    }

    metadata.ddtags = customTags;
  }
}

DataDog.prototype.log = (log) => {

  console.log(config.apiKey);
  console.log(log[0]);

  return axios.post(`https://http-intake.logs.datadoghq.com/v1/input/${config.apiKey}?ddsource=auth2&service=auth2&hostname=accounts.staging.stockx.io`, [{
    message: 'Simple message from auth2'
  }]).then(response => {
    console.log('Worked');
    console.log(response.data);
    console.log(response.status);
  }).catch(error => {
    console.log('Error');
    console.log(error);
  });
};

module.exports = DataDog;
