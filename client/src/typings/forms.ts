import { ObjectSchema, Shape } from 'yup';

export type YupSchema<T extends object> = ObjectSchema<Shape<object | undefined, T>>;
