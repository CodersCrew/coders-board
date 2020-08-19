import Joi from '@hapi/joi';

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

export const requiredInProduction = ({ joiType, defaultValue }: RequiredInProductionParams) =>
  NODE_ENV === 'production' ? joiType.required() : joiType.optional().default(defaultValue);
