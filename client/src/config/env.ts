const createEnvVariable = <T extends string>(name: string, required = true, oneOf?: T[]): T => {
  const envVariableValue = process.env[name] as T;

  if (required && !envVariableValue) {
    throw new Error(`To run the app you need to provide the ${name} environment variable`);
  }

  if (oneOf && !oneOf.includes(envVariableValue)) {
    const possibleValues = oneOf.join(', ');

    throw new Error(
      `${name} environment variable could have one of the following values: ${possibleValues}. Received: ${envVariableValue}`,
    );
  }

  return envVariableValue;
};

export const SERVER_URL = createEnvVariable('REACT_APP_SERVER_URL', false);

export const NODE_ENV = createEnvVariable<'development' | 'test' | 'production'>('NODE_ENV', true, [
  'development',
  'test',
  'production',
]);
