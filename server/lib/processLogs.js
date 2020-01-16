const loggingTools = require('auth0-log-extension-tools');

const config = require('./config');
const logger = require('./logger');
const DataDog = require('./datadog');

module.exports = storage =>
    (req, res, next) => {
        const wtBody = (req.webtaskContext && req.webtaskContext.body) || req.body || {};
        const wtHead = (req.webtaskContext && req.webtaskContext.headers) || {};
        const isCron = (wtBody.schedule && wtBody.state === 'active') || (wtHead.referer === `${config('AUTH0_MANAGE_URL')}/` && wtHead['if-none-match']);

        if (!isCron) {
            return next();
        }

        const datadog = new DataDog(config('DATADOG_SERVER'), config('DATADOG_API_KEY'), config('DATADOG_CUSTOM_TAGS'));

        const auth0logger = new loggingTools.LogsProcessor(storage, {
            domain: config('AUTH0_DOMAIN'),
            clientId: config('AUTH0_CLIENT_ID'),
            clientSecret: config('AUTH0_CLIENT_SECRET'),
            batchSize: 100,
            startFrom: config('START_FROM'),
            logLevel: config('LOG_LEVEL'),
            logTypes: config('LOG_TYPES')
        });

        return auth0logger
            .run(logs => {

                logger.info('Running');
                console.log('Running');

                if (!logs) {
                    logger.info('No logs');
                    return Promise.resolve();
                }

                logger.info(`Sending ${logs.length} logs to DataDog.`);

                return datadog.log(logs);
            })
            .then(status => {
                logger.info('Done');
                console.log('Done');
                console.log(status);

            })
            .catch(err => console.log(err));
    };
