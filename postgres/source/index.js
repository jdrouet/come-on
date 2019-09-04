const {Client} = require('pg');
const config = require('./config');

const wait = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const test = () => {
  const client = new Client(config.get('postgres'));
  return client.connect()
    .then(() => client.query('SELECT NOW()'))
    .then(() => client.end());
};

const iterate = async (retry) => {
  if (retry <= 0) {
    throw new Error('Too many retries');
  }
  try {
    await test();
  } catch (err) {
    console.error(err.message);
    await wait(config.get('interval'))
    await iterate(retry - 1);
  }
}

const run = () =>
  iterate(config.get('retry'));

module.exports = {
  iterate,
  run,
  test,
  wait,
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
