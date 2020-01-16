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

  if (customTags) {
    const matchedTags = customTags.match(/([^:|^,\W]+):([^,|^\W]+)/g);
    if (!matchedTags || matchedTags.length < 1) {
      throw new Error('Custom tags are not formatted properly. Format is comma-separated key:value.');
    }

    metadata.ddtags = customTags;
  }
}

DataDog.prototype.log = (logs) => {

  return axios.post(`https://http-intake.logs.datadoghq.com/v1/input/${config.apiKey}`, logs, {
    headers: {
      'Content-Type': 'application/json'
    },
    qs: {
      ddsource: config.source,
      hostname: config.hostname,
      service: 'Auth0'
    }
  }).then(response => {
    console.log('Worked');
    console.log(response.data);
    console.log(response.status);
  }).catch(error => {
    console.log('Error');
    console.log(error);
  });
};

module.exports = DataDog;
