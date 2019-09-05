module.exports = require('nconf')
  .use('memory')
  .env({
    separator: '_',
  })
  .defaults({
    interval: 1000,
    retry: 60,
    postgres: {
    },
  });
