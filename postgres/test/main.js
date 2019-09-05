const {expect} = require('chai');
const waitForPg = require('../source');
const config = require('../source/config');

describe('come-on-postgres', function() {
  describe('check', function() {
    it('should throw no connection', function(done) {
      waitForPg
        .check({connectionString: 'postgres://fake/fake'})()
        .catch((err) => {
          expect(err.message).to.eql('getaddrinfo ENOTFOUND fake');
          done();
        });
    });
  });

  describe('iterate', function() {
    it('should throw if reach 0 retry', function(done) {
      waitForPg.run({
        retry: 1,
        interval: 10,
        postgres: {connectionString: 'postgres://fake/fake'},
      }).catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });

    it('should iterate twice', function(done) {
      waitForPg.run({
        retry: 2,
        interval: 10,
        postgres: {connectionString: 'postgres://fake/fake'},
      }).catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });
  });

  describe('run', function() {
    it('should start iterating', function(done) {
      waitForPg.run({
        retry: 2,
        interval: 10,
        postgres: {connectionString: 'postgres://fake/fake'},
      }).catch((err) => {
        expect(err.message).to.eql('Too many retries');
        done();
      });
    });
  });
});
