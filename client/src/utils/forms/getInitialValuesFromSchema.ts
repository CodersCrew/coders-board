import { ObjectSchema } from 'yup';

export const getInitialValuesFromSchema = <T extends Record<string, unknown>>(schema: ObjectSchema<T | undefined>) =>
  schema.cast() as T;
