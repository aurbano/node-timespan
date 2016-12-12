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

var defaultSettings = {
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
  this.settings = extend({}, defaultSettings, opts);
  this.buildIncrements();
};

readableTimespans.prototype.buildIncrements = function() {
  this.settings.increments = [
    [MILLISECOND, this.settings.millisecond],
    [SECOND, this.settings.second],
    [MINUTE, this.settings.minute],
    [HOUR, this.settings.hour],
    [DAY, this.settings.day],
    [WEEK, this.settings.week],
    [MONTH, this.settings.month],
    [YEAR, this.settings.year]
  ];
};

readableTimespans.prototype.parse = function(diff) {
  var plural = '',
    space = ' ',
    units = Math.ceil(diff / this.settings.increments[this.settings.increments.length - 1][0]),
    unit = this.settings.increments[this.settings.increments.length - 1][1],
    checkValid = 0;

  // Handle units smaller than the first increment
  while (!this.settings.increments[checkValid][1]) {
    checkValid++;
  }

  if (diff < this.settings.increments[checkValid][0]) {
    return this.settings.lessThanFirst;
  }

  for (i = 1; i < this.settings.increments.length; i++) {

    if (!this.settings.increments[i - 1][1]) continue;

    if (this.settings.increments[i - 1][0] <= diff && diff < this.settings.increments[i][0]) {
      units = Math.ceil(diff / this.settings.increments[i - 1][0]);
      unit = this.settings.increments[i - 1][1];
      break;
    }
  }

  if (units > 1 && this.settings.pluralize) {
    plural = 's';
  }
  if (!this.settings.space) space = '';

  return units + space + unit + plural;
};

/**
 * Set configuration options
 */
readableTimespans.prototype.set = function(opts) {
  extend(this.settings, opts);

  this.buildIncrements();
};

readableTimespans.prototype.create = function(opts) {
    var newOpts = extend({}, this.settings, opts);
    return new readableTimespans(newOpts);
};

module.exports = new readableTimespans();
