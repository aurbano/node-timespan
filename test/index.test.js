import test from 'ava';
import timespan from '../index.js';


test('Should return now for negatives', t => {
  t.is(timespan.parse(-1), 'now');
});

test('Should return timespan of milliseconds', t => {
  t.is(timespan.parse(50), '50 milliseconds');
});

test('Should return timespan of seconds', t => {
  t.is(timespan.parse(40 * 1000), '40 seconds');
});

test('Should pluralize correctly', t => {
  t.is(timespan.parse(1 * 60 * 1000), '1 minute');
});

test('Should return timespan of minutes', t => {
  t.is(timespan.parse(2.91 * 60 * 1000), '3 minutes');
});

test('Should return timespan of hours', t => {
  t.is(timespan.parse(2 * 60 * 60 * 1000), '2 hours');
});

test('Should return timespan of days', t => {
  t.is(timespan.parse(5 * 24 * 60 * 60 * 1000), '5 days');
});

test('Should return timespan of weeks', t => {
  t.is(timespan.parse(2 * 7 * 24 * 60 * 60 * 1000), '2 weeks');
});

test('Should return timespan of months', t => {
  t.is(timespan.parse(9 * 30 * 24 * 60 * 60 * 1000), '9 months');
});

test('Should return timespan of years', t => {
  t.is(timespan.parse(11 * 365 * 24 * 60 * 60 * 1000), '11 years');
});

test('Should allow changed units', t => {
  timespan.set({
    second: 's',
    minute: 'm'
  });

  t.is(timespan.parse(40 * 1000), '40 ss');
  t.is(timespan.parse(2.91 * 60 * 1000), '3 ms');
  t.is(timespan.parse(2 * 60 * 60 * 1000), '2 hours');
});

test('Should allow removing space and plural', t => {
  timespan.set({
    pluralize: false,
    space: false
  });
  t.is(timespan.parse(40 * 1000), '40s');
  t.is(timespan.parse(2.91 * 60 * 1000), '3m');
  t.is(timespan.parse(2 * 60 * 60 * 1000), '2hour');
});

test('Should allow disabling units, and return now', t => {
  timespan.set({
    millisecond: false
  });
  t.is(timespan.parse(50), 'now');
});

test('Allow creating new objects with different settings', t => {
    const time2 = timespan.create({
        millisecond: false
    });
    timespan.set({
      millisecond: 'ms'
    });
    t.is(time2.parse(50), 'now');
    t.is(timespan.parse(50), '50ms');
});