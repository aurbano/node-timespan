export type Options = {
  lessThanFirst?: string,
  millisecond?: string | false,
  second?: string | false,
  minute?: string | false,
  hour?: string | false,
  day?: string | false,
  week?: string | false,
  month?: string | false,
  year?: string | false,
  now?: string,
  space?: boolean,
  pluralize?: boolean,
};

export type Increments = Array<[number, string | false]>;