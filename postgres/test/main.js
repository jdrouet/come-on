const {expect} = require('chai');
const sinon = require('sinon');
const waitForPg = require('../source');
const config = require('../source/config');

describe('wait-for-postgres', function() {
  describe('test', function() {
    it('should throw no connection', function(done) {
      config.set('postgres', {connectionString: 'postgres://fake/fake'});
      waitForPg.test().catch((err) => {
        expect(err.message).to.eql('getaddrinfo ENOTFOUND fake');
        done();
      });
    });
  });

  describe('iterate', function() {
    it('should throw if reach 0 retry', function(done) {
      waitForPg.iterate(0).catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });

    it('should iterate twice', function(done) {
      config.set('postgres', {connectionString: 'postgres://fake/fake'});
      waitForPg.iterate(1).catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });
  });

  describe('run', function() {
    it('should start iteratig', function(done) {
      config.set('retry', 2);
      config.set('interval', 10);
      waitForPg.run().catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });
  });
});
