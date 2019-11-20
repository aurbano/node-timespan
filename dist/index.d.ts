import { Options, Increments } from './types';
export declare class Timespan {
    settings: Options;
    increments: Increments;
    constructor(options?: Options);
    parse(diff: number): string;
}
export default Timespan;
