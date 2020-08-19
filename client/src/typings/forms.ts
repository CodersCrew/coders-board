import { ObjectSchema, Shape } from 'yup';

export type YupSchema<T extends Record<string, unknown>> = ObjectSchema<Shape<Record<string, unknown> | undefined, T>>;
