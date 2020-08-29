import { object, ObjectSchema, ObjectSchemaDefinition, Shape } from 'yup';

type YupSchema<V extends Record<string, unknown>> = ObjectSchema<Shape<Record<string, unknown> | undefined, V>> & {
  initialValues: V;
};

/**
 * Generates Yup validation schema for the specified object with field validations.
 * @param fields Object with validation schemas.
 */
export const createValidationSchema = <V extends Record<string, unknown>>(fields: ObjectSchemaDefinition<V>) => {
  const schema = object(fields) as YupSchema<V>;

  schema.initialValues = schema.cast() as V;

  return schema;
};
