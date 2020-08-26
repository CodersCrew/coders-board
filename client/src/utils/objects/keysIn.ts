type ObjectKeys<T> = T extends Record<string, unknown>
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<unknown> | string
  ? string[]
  : never;

export const keysIn = <T>(obj: T) => Object.keys(obj) as ObjectKeys<T>;
