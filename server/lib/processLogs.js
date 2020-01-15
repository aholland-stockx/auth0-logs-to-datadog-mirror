const async = require('async');
const moment = require('moment');
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

    const onLogsReceived = (logs) => { // eslint-disable-line consistent-return


      if (!logs) {
        logger.info('No logs');
        return Promise.resolve();
      }

      logger.info(`Sending ${logs.length} logs to DataDog.`);

      return async.eachLimit(logs, 10, (log) => {
        logger.info('In each limit');
        return datadog.log(log);
      });
    };

    const slack = new loggingTools.reporters.SlackReporter({
      hook: config('SLACK_INCOMING_WEBHOOK_URL'),
      username: 'auth0-logs-to-datadog',
      title: 'Logs To DataDog'
    });

    const options = {
      domain: config('AUTH0_DOMAIN'),
      clientId: config('AUTH0_CLIENT_ID'),
      clientSecret: config('AUTH0_CLIENT_SECRET'),
      batchSize: parseInt(config('BATCH_SIZE'), 10),
      startFrom: config('START_FROM'),
      logLevel: config('LOG_LEVEL'),
      logTypes: config('LOG_TYPES')
    };

    if (!options.batchSize || options.batchSize > 100) {
      options.batchSize = 100;
    }

    if (options.logTypes && !Array.isArray(options.logTypes)) {
      options.logTypes = options.logTypes.replace(/\s/g, '').split(',');
    }

    const auth0logger = new loggingTools.LogsProcessor(storage, options);

    const sendDailyReport = (lastReportDate) => {
      const current = new Date();

      const end = current.getTime();
      const start = end - 86400000;
      auth0logger.getReport(start, end)
        .then(report => slack.send(report, report.checkpoint))
        .then(() => storage.read())
        .then((data) => {
          data.lastReportDate = lastReportDate; // eslint-disable-line no-param-reassign
          return storage.write(data);
        });
    };

    const checkReportTime = () => {
      storage.read()
        .then((data) => {
          const now = moment().format('DD-MM-YYYY');
          const reportTime = config('DAILY_REPORT_TIME') || 16;

          if (data.lastReportDate !== now && new Date().getHours() >= reportTime) {
            sendDailyReport(now);
          }
        });
    };

    return auth0logger
      .run(onLogsReceived)
      .then(status => console.log(status))
      .catch(err => console.log(err));
  };
