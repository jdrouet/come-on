const waitFor = require('@jdrouet/come-on');
const {Client} = require('pg');
const config = require('./config');

const check = () => {
  const client = new Client(config.get('postgres'));
  return client.connect()
    .then(() => client.query('SELECT NOW()'))
    .then(() => client.end());
};

const run = () => {
  const options = {
    interval: config.get('interval'),
    retry: config.get('retry'),
  };
  return waitFor(options, check);
};

module.exports = {
  check,
  run,
};

/* istanbul ignore if */
if (!module.parent) {
  run().then(() => {
    console.log('connection ready');
    process.exit(0);
  }).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
