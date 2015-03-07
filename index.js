/**
 * readable-timespans
 * Get human-readable timespans from time intervals in milliseconds
 *
 * @author Alejandro U. Alvarez (http://urbanoalvarez.es)
 * @license GPLv2
 */

var extend = require('extend');

// Adjust this definition if you want
// this assumes all months have 30 days, every year
// 365 days, and every month 4 weeks. Since it is only
// to give a very rough estimate of the time elapsed it should
// be fine though.
var MILLISECOND = 1,
  SECOND = 1000 * MILLISECOND,
  MINUTE = 60 * SECOND,
  HOUR = 60 * MINUTE,
  DAY = 24 * HOUR,
  WEEK = 7 * DAY,
  MONTH = 30 * DAY,
  YEAR = 365 * DAY;

var settings = {
  lessThanFirst: 'now',
  millisecond: 'millisecond',
  second: 'second',
  minute: 'minute',
  hour: 'hour',
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
  now: 'now',
  space: true,
  pluralize: true
};

var readableTimespans = function(opts) {
  this.set(opts);
  buildIncrements();
};

function buildIncrements() {
  settings.increments = [
    [MILLISECOND, settings.millisecond],
    [SECOND, settings.second],
    [MINUTE, settings.minute],
    [HOUR, settings.hour],
    [DAY, settings.day],
    [WEEK, settings.week],
    [MONTH, settings.month],
    [YEAR, settings.year]
  ];
}

readableTimespans.prototype.parse = function(diff) {
  var plural = '',
    space = ' ',
    units = Math.ceil(diff / settings.increments[settings.increments.length - 1][0]),
    unit = settings.increments[settings.increments.length - 1][1],
    checkValid = 0;

  // Handle units smaller than the first increment
  while (!settings.increments[checkValid][1]) {
    checkValid++;
  }

  if (diff < settings.increments[checkValid][0]) {
    return settings.lessThanFirst;
  }

  for (i = 1; i < settings.increments.length; i++) {

    if (!settings.increments[i - 1][1]) continue;

    if (settings.increments[i - 1][0] <= diff && diff < settings.increments[i][0]) {
      units = Math.ceil(diff / settings.increments[i - 1][0]);
      unit = settings.increments[i - 1][1];
      break;
    }
  }

  if (units > 1 && settings.pluralize) {
    plural = 's';
  }
  if (!settings.space) space = '';

  return units + space + unit + plural;
}

/**
 * Set configuration options
 */
readableTimespans.prototype.set = function(opts) {
  extend(settings, opts);

  buildIncrements();
};

module.exports = new readableTimespans();
