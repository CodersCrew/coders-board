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

const NODE_ENV = process.env.NODE_ENV || 'development';

export const requiredIn = (env: EnvVariables['NODE_ENV'], { joiType, defaultValue }: RequiredInProductionParams) =>
  NODE_ENV === env ? joiType.required() : joiType.optional().default(defaultValue);
