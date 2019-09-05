const {expect} = require('chai');
const waitForPg = require('../source');

describe('come-on-rabbit', function() {
  describe('check', function() {
    it('should throw no connection', function(done) {
      waitForPg.check('amqp://whatever')().catch((err) => {
        expect(err.message).to.eql('getaddrinfo ENOTFOUND whatever');
        done();
      });
    });
  });

  describe('iterate', function() {
    it('should throw if reach 0 retry', function(done) {
      waitForPg.run({
        interval: 10,
        retry: 1,
        rabbit: 'amqp://whatever',
      }).catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });

    it('should iterate twice', function(done) {
      waitForPg.run({
        interval: 10,
        retry: 2,
        rabbit: 'amqp://whatever',
      }).catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });
  });

  describe('run', function() {
    it('should start iterating', function(done) {
      waitForPg.run({
        interval: 10,
        retry: 2,
        rabbit: 'amqp://whatever',
      }).catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });
  });
});
