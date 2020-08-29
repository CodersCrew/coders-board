type ObjectKeys<T> = T extends Record<string, unknown>
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<unknown> | string
  ? string[]
  : never;

/**
 * Creates an array of property names of object.
 * @param obj The object to query.
 */
export const keysIn = <T>(obj: T) => Object.keys(obj) as ObjectKeys<T>;
