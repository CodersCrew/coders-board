import Joi from '@hapi/joi';

import { EnvVariables } from './env.types';

type RequiredInProductionParams =
  | {
      joiType: Joi.StringSchema;
      defaultValue: string;
    }
  | {
      joiType: Joi.BooleanSchema;
      defaultValue: boolean;
    }
  | {
      joiType: Joi.NumberSchema;
      defaultValue: number;
    };

export const requiredInProduction = (
  appEnv: EnvVariables['APP_ENV'],
  { joiType, defaultValue }: RequiredInProductionParams,
) => (appEnv === 'production' ? joiType.required() : joiType.optional().default(defaultValue));

export const productionRequiredString = (appEnv: EnvVariables['APP_ENV']) =>
  requiredInProduction(appEnv, { joiType: Joi.string(), defaultValue: '' });
