module.exports = require('nconf')
  .use('memory')
  .env('_')
  .defaults({
    interval: 1000,
    retry: 60,
    rabbit: '',
  });
