/**
 * Extends provided object with id property.
 */
export type WithId<T extends Record<string, unknown>> = T & { id: string };
