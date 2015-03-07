/**
 * Test readable-timespans
 */
var should = require('should'),
  readableTimespans = require('../index.js')

describe('Readable timespans', function() {
  describe('Default options', function() {

    it('Should return now for negatives', function(done) {
      readableTimespans.parse(-1).should.be.exactly('now').and.be.a.String;
      done();
    });

    it('Should return timespan of milliseconds', function(done) {
      readableTimespans.parse(50).should.be.exactly('50 milliseconds').and.be.a.String;
      done();
    });

    it('Should return timespan of seconds', function(done) {
      readableTimespans.parse(40 * 1000).should.be.exactly('40 seconds').and.be.a.String;
      done();
    });

    it('Should pluralize correctly', function(done) {
      readableTimespans.parse(1 * 60 * 1000).should.be.exactly('1 minute').and.be.a.String;
      done();
    });

    it('Should return timespan of minutes', function(done) {
      readableTimespans.parse(2.91 * 60 * 1000).should.be.exactly('3 minutes').and.be.a.String;
      done();
    });

    it('Should return timespan of hours', function(done) {
      readableTimespans.parse(2 * 60 * 60 * 1000).should.be.exactly('2 hours').and.be.a.String;
      done();
    });

    it('Should return timespan of days', function(done) {
      readableTimespans.parse(5 * 24 * 60 * 60 * 1000).should.be.exactly('5 days').and.be.a.String;
      done();
    });

    it('Should return timespan of weeks', function(done) {
      readableTimespans.parse(2 * 7 * 24 * 60 * 60 * 1000).should.be.exactly('2 weeks').and.be.a.String;
      done();
    });

    it('Should return timespan of months', function(done) {
      readableTimespans.parse(9 * 30 * 24 * 60 * 60 * 1000).should.be.exactly('9 months').and.be.a.String;
      done();
    });

    it('Should return timespan of years', function(done) {
      readableTimespans.parse(11 * 365 * 24 * 60 * 60 * 1000).should.be.exactly('11 years').and.be.a.String;
      done();
    });
  });

  describe('Change settings', function() {
    it('Should allow changed units', function(done) {
      readableTimespans.set({
        second: 's',
        minute: 'm'
      });
      readableTimespans.parse(40 * 1000).should.be.exactly('40 ss').and.be.a.String;
      readableTimespans.parse(2.91 * 60 * 1000).should.be.exactly('3 ms').and.be.a.String;
      readableTimespans.parse(2 * 60 * 60 * 1000).should.be.exactly('2 hours').and.be.a.String;

      done();
    });

    it('Should allow removing space and plural', function(done) {
      readableTimespans.set({
        pluralize: false,
        space: false
      });
      readableTimespans.parse(40 * 1000).should.be.exactly('40s').and.be.a.String;
      readableTimespans.parse(2.91 * 60 * 1000).should.be.exactly('3m').and.be.a.String;
      readableTimespans.parse(2 * 60 * 60 * 1000).should.be.exactly('2hour').and.be.a.String;

      done();
    });

    it('Should allow disabling units, and return now', function(done) {
      readableTimespans.set({
        millisecond: false
      });
      readableTimespans.parse(50).should.be.exactly('now').and.be.a.String;
      done();
    });
  });
});
