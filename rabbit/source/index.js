const waitFor = require('@jdrouet/come-on');
const amqp = require('amqplib');

const check = (options) => () =>
  amqp.connect(options)
    .then((con) => con.close());

const run = (options) => {
  const waitOpts = {
    debug: options.debug || null,
    interval: options.interval,
    retry: options.retry,
  };
  return waitFor(waitOpts, check(options.rabbit));
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
