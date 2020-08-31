import * as yup from 'yup';

const createEnvVariable = <T extends string>(name: string, options?: { required?: boolean; oneOf?: T[] }): T => {
  const envVariableValue = process.env[name] as T;

  if (options?.required) yup.string().required().validateSync(envVariableValue);

  if (options?.oneOf) yup.string().oneOf(options.oneOf).validateSync(envVariableValue);

  return envVariableValue;
};

export const SERVER_URL = createEnvVariable('REACT_APP_SERVER_URL');

export const NODE_ENV = createEnvVariable<'development' | 'test' | 'production'>('NODE_ENV', {
  required: true,
  oneOf: ['development', 'test', 'production'],
});
