const {expect} = require('chai');
const waitForPg = require('../source');
const config = require('../source/config');

describe('come-on-rabbit', function() {
  describe('check', function() {
    it('should throw no connection', function(done) {
      config.set('rabbit', 'amqp://whatever');
      waitForPg.check().catch((err) => {
        expect(err.message).to.eql('getaddrinfo ENOTFOUND whatever');
        done();
      });
    });
  });

  describe('iterate', function() {
    it('should throw if reach 0 retry', function(done) {
      config.set('retry', 1);
      config.set('interval', 10);
      waitForPg.run().catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });

    it('should iterate twice', function(done) {
      config.set('retry', 2);
      config.set('interval', 10);
      config.set('rabbit', 'amqp://whatever');
      waitForPg.run().catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });
  });

  describe('run', function() {
    it('should start iterating', function(done) {
      config.set('retry', 2);
      config.set('interval', 10);
      config.set('rabbit', 'amqp://whatever');
      waitForPg.run().catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });
  });
});