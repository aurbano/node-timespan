import test from 'ava';

import Timespan from '../src/index';

test('Should return now for negatives', t => {
  const timespan = new Timespan();
  t.is(timespan.parse(-1), 'now');
});

test('Should return timespan of milliseconds', t => {
  const timespan = new Timespan();
  t.is(timespan.parse(50), '50 milliseconds');
});

test('Should return timespan of seconds', t => {
  const timespan = new Timespan();
  t.is(timespan.parse(40 * 1000), '40 seconds');
});

test('Should pluralize correctly', t => {
  const timespan = new Timespan();
  t.is(timespan.parse(1 * 60 * 1000), '1 minute');
});

test('Should return timespan of minutes', t => {
  const timespan = new Timespan();
  t.is(timespan.parse(2.91 * 60 * 1000), '3 minutes');
});

test('Should return timespan of hours', t => {
  const timespan = new Timespan();
  t.is(timespan.parse(2 * 60 * 60 * 1000), '2 hours');
});

test('Should return timespan of days', t => {
  const timespan = new Timespan();
  t.is(timespan.parse(5 * 24 * 60 * 60 * 1000), '5 days');
});

test('Should return timespan of weeks', t => {
  const timespan = new Timespan();
  t.is(timespan.parse(2 * 7 * 24 * 60 * 60 * 1000), '2 weeks');
});

test('Should return timespan of months', t => {
  const timespan = new Timespan();
  t.is(timespan.parse(9 * 30 * 24 * 60 * 60 * 1000), '9 months');
});

test('Should return timespan of years', t => {
  const timespan = new Timespan();
  t.is(timespan.parse(11 * 365 * 24 * 60 * 60 * 1000), '11 years');
});

test('Should allow changed units', t => {
  const timespan = new Timespan({
    second: 's',
    minute: 'm',
    hour: 'h',
    pluralize: false,
  });

  t.is(timespan.parse(40 * 1000), '40 s');
  t.is(timespan.parse(2.91 * 60 * 1000), '3 m');
  t.is(timespan.parse(2 * 60 * 60 * 1000), '2 h');
});

test('Should allow removing space and plural', t => {
  const timespan = new Timespan({
    second: 's',
    minute: 'm',
    hour: 'h',
    pluralize: false,
    space: false,
  });
  t.is(timespan.parse(40 * 1000), '40s');
  t.is(timespan.parse(2.91 * 60 * 1000), '3m');
  t.is(timespan.parse(2 * 60 * 60 * 1000), '2h');
});

test('Should allow disabling units, and return now', t => {
  const timespan = new Timespan({
    millisecond: false
  });
  t.is(timespan.parse(50), 'now');
});

test('Allow creating new objects with different settings', t => {
  const timespan = new Timespan({
    millisecond: 'ms',
    pluralize: false,
    space: false,
  });
  const time2 = new Timespan({
    millisecond: false
  });

  t.is(timespan.parse(50), '50ms');
  t.is(time2.parse(50), 'now');
});