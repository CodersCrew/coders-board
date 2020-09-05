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

export const requiredInProduction = (isProduction: boolean, { joiType, defaultValue }: RequiredInProductionParams) =>
  isProduction ? joiType.required() : joiType.optional().default(defaultValue);

export const productionRequiredString = (isProduction: boolean) =>
  requiredInProduction(isProduction, { joiType: Joi.string(), defaultValue: '' });
