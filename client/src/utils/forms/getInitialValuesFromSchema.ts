import { ObjectSchema } from 'yup';

export const getInitialValuesFromSchema = <T extends object>(schema: ObjectSchema<T | undefined>) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return schema.cast()!;
};
