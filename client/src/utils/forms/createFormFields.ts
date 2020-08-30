import { keyBy, map } from 'lodash';
import { object, ObjectSchema, ObjectSchemaDefinition, SchemaDescription } from 'yup';

import { UndefinedOptional } from '@/typings/utilityTypes';

export type ItemProps = {
  name: string;
  label: string;
  required: boolean;
};

/**
 * Generates basic form properties based on fields validation schemas.
 * @param fields Object with validation schemas.
 */
export const createFormFields = <V extends Record<string, unknown>>(fieldsConfig: ObjectSchemaDefinition<V>) => {
  const schema = object(fieldsConfig) as ObjectSchema<V>;

  const fieldsArr = map(schema.describe().fields as Record<keyof V, SchemaDescription>, (field, key) => ({
    name: key,
    label: field.label,
    required: !!field.tests.find(({ name }) => name === 'required'),
  }));

  const fields = keyBy(fieldsArr, field => field.name) as Record<keyof V & string, ItemProps>;

  const getInitialValues = (values?: any) => (values ? schema.cast(values) : schema.cast()) as UndefinedOptional<V>;

  return {
    validationSchema: schema,
    fields,
    getInitialValues,
  };
};
