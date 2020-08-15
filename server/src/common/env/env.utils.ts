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

export const requiredInProduction = ({ joiType, defaultValue }: RequiredInProductionParams) =>
  process.env.NODE_ENV === 'production' ? joiType.required() : joiType.optional().default(defaultValue);
