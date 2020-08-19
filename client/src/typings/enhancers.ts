export type WithId<T extends Record<string, unknown>> = T & { id: string };
