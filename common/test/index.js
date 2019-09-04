const sinon = require('sinon');
const {expect} = require('chai');
const waitFor = require('../source');

describe('waitFor', function() {
  it('should try 1 time', function() {
    const check = sinon.fake.resolves();
    return waitFor({retry: 10, interval: 100}, check)
      .then(() => {
        expect(check.callCount).to.eql(1);
      });
  });

  it('should try 3 times and reject', function() {
    const check = sinon.fake.rejects(new Error('nope'));
    return waitFor({retry: 3, interval: 10}, check)
      .catch(() => {
        expect(check.callCount).to.eql(3);
      });
  });

  it('should logs', function() {
    const check = sinon.fake.rejects(new Error('nope'));
    const debug = sinon.fake();
    return waitFor({retry: 3, interval: 10, debug}, check)
      .catch(() => {
        expect(check.callCount).to.eql(3);
        expect(debug.callCount).to.eql(3);
      });
  });
});
