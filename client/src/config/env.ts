import * as yup from 'yup';

const createEnvVariable = <T extends string>(
  name: string,
  options?: { required?: boolean; default?: T; oneOf?: T[] },
): T => {
  const envVariableValue = (process.env[name] ?? options?.default) as T;

  if (options?.required) yup.string().required().validateSync(envVariableValue);

  if (options?.oneOf) yup.string().oneOf(options.oneOf).validateSync(envVariableValue);

  return envVariableValue;
};

export const SERVER_URL = createEnvVariable('REACT_APP_SERVER_URL', { required: false, default: '' });

export const APP_ENV = createEnvVariable<'local' | 'review' | 'staging' | 'production'>('REACT_APP_APP_ENV', {
  required: false,
  default: 'local',
  oneOf: ['local', 'review', 'staging', 'production'],
});

export const NODE_ENV = createEnvVariable<'development' | 'test' | 'production'>('NODE_ENV', {
  required: false,
  default: 'development',
  oneOf: ['development', 'test', 'production'],
});
