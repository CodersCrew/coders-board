import { validateEnvVariables } from './validateEnvVariables';

export const env = validateEnvVariables(process.env);
