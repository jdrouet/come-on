module.exports = require('nconf')
  .use('memory')
  .env({
    separator: '_',
    whitelist: ['interval', 'retry', 'rabbit'],
  })
  .defaults({
    interval: 1000,
    retry: 60,
    rabbit: '',
  });
