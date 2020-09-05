import path from 'path';

import { EnvConfig } from './validateEnvVariables';

export const env = new EnvConfig(path.resolve(__dirname, '../../../.env')).envConfig;
