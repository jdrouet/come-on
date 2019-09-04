const wait = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const noop = () => null;

/**
 * @param {object} options options
 * @param {function} options.debug function to log the errors
 * @param {integer} options.interval ms to wait between trials
 * @param {integer} options.retry number of type the waiter should retry
 * @param {function} check callback to call to check if it's ok
 */
const execute = async (options, check) => {
  const debug = options.debug || noop;
  for (let i = options.retry; i > 0; i--) {
    try {
      await check();
      return;
    } catch (err) {
      debug(err);
    }
    await wait(options.interval);
  }
  throw new Error('Too many retries');
};

module.exports = execute;
