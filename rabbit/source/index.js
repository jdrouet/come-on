const waitFor = require('@jdrouet/come-on');
const amqp = require('amqplib');
const config = require('./config');

const check = () =>
  amqp.connect(config.get('rabbit'))
    .then((con) => con.close());

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
