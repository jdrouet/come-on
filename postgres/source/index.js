const waitFor = require('@jdrouet/come-on');
const {Client} = require('pg');

const check = (options) => () => {
  const client = new Client(options);
  return client.connect()
    .then(() => client.query('SELECT NOW()'))
    .then(() => client.end());
};

const run = (options) => {
  const waitOpts = {
    debug: options.debug || null,
    interval: options.interval,
    retry: options.retry,
  };
  return waitFor(waitOpts, check(options.postgres));
};

module.exports = {
  check,
  run,
};

/* istanbul ignore if */
if (!module.parent) {
  const config = require('./config');
  run(config.get()).then(() => {
    console.log('connection ready');
    process.exit(0);
  }).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
