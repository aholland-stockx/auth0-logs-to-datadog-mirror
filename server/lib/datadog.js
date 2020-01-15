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

  if (server === 'US') {
    config.host = 'http-intake.logs.datadoghq.com';
    config.port = 443;
  } else {
    config.host = 'tcp-intake.logs.datadoghq.eu';
    config.port = 443;
  }

  if (customTags) {
    const matchedTags = customTags.match(/([^:|^,\W]+):([^,|^\W]+)/g);
    if (!matchedTags || matchedTags.length < 1) {
      throw new Error('Custom tags are not formatted properly. Format is comma-separated key:value.');
    }

    metadata.ddtags = customTags;
  }
}

DataDog.prototype.log = (log) => {

  logger.info(`Calling axios. Here's the log`);
  console.log(log);

  return axios.post(`https://http-intake.logs.datadoghq.com/v1/input/${config.apiKey}?ddsource=auth2&service=auth2&hostname=accounts.staging.stockx.io`, log, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    logger.info(`Got success response`);
    console.log(response.data);
    console.log(response.status);
  }).catch(error => {
    logger.info(`Got error`);
    logger.info(error);
  });
};

module.exports = DataDog;
