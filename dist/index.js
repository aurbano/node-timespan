"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * readable-timespans
 * Get human-readable timespans from time intervals in milliseconds
 *
 * @author Alejandro U. Alvarez <https://aurbano.eu>
 * @license MIT
 */
/**
 * Adjust this definition if you want
 * this assumes all months have 30 days, every year
 * 365 days, and every month 4 weeks. Since it is only
 * to give a very rough estimate of the time elapsed it should
 * be fine though.
 */
const MILLISECOND = 1, SECOND = 1000 * MILLISECOND, MINUTE = 60 * SECOND, HOUR = 60 * MINUTE, DAY = 24 * HOUR, WEEK = 7 * DAY, MONTH = 30 * DAY, YEAR = 365 * DAY;
const defaultSettings = {
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
class Timespan {
    constructor(options) {
        this.settings = Object.assign(Object.assign({}, defaultSettings), options);
        this.increments = [
            [MILLISECOND, this.settings.millisecond],
            [SECOND, this.settings.second],
            [MINUTE, this.settings.minute],
            [HOUR, this.settings.hour],
            [DAY, this.settings.day],
            [WEEK, this.settings.week],
            [MONTH, this.settings.month],
            [YEAR, this.settings.year],
        ];
    }
    ;
    parse(diff) {
        let plural = '', space = ' ', checkValid = 0, units = Math.ceil(diff / this.increments[this.increments.length - 1][0]), unit = this.increments[this.increments.length - 1][1];
        // Handle units smaller than the first increment
        while (!this.increments[checkValid][1]) {
            checkValid++;
        }
        if (diff < this.increments[checkValid][0]) {
            return this.settings.lessThanFirst;
        }
        for (let i = 1; i < this.increments.length; i++) {
            if (!this.increments[i - 1][1])
                continue;
            if (this.increments[i - 1][0] <= diff && diff < this.increments[i][0]) {
                units = Math.ceil(diff / this.increments[i - 1][0]);
                unit = this.increments[i - 1][1];
                break;
            }
        }
        if (units > 1 && this.settings.pluralize) {
            plural = 's';
        }
        if (!this.settings.space)
            space = '';
        return units + space + unit + plural;
    }
}
exports.Timespan = Timespan;
exports.default = Timespan;
//# sourceMappingURL=index.js.map