/**
 * Get the keys of the properties to which U can be assigned.
 */
export type PickKeysByValue<T, U> = {
  [K in keyof T]: U extends T[K] ? K : never;
}[keyof T];

/**
 * Get the interface containing only properties to which undefined can be assigned.
 */
export type PickByValue<T, V> = {
  [K in PickKeysByValue<T, V>]: T[K];
};

/**
 * Get all of the keys except those to which U can be assigned.
 */
export type OmitKeysByValue<T, U> = {
  [K in keyof T]: U extends T[K] ? never : K;
}[keyof T];

/**
 * Get the interface containing no properties to which undefined can be assigned.
 */
export type OmitByValue<T, V> = {
  [K in OmitKeysByValue<T, V>]: T[K];
};

/**
 * Get the interface where properties that can be assigned undefined are
 * also optional.
 */
export type UndefinedOptional<T> = OmitByValue<T, undefined> & Partial<PickByValue<T, undefined>>;
