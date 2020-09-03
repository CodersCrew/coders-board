import Joi from '@hapi/joi';
import dotenv from 'dotenv';

import { EnvVariables } from './env.types';
import { productionRequiredString, requiredIn } from './env.utils';

dotenv.config();

export const validateEnvVariables = (env: NodeJS.ProcessEnv): EnvVariables => {
  const envVarsSchema: Joi.ObjectSchema<EnvVariables> = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),

    PORT: Joi.number().required(),
    CLIENT_URL: Joi.string().allow('').default(''),

    // database
    DATABASE_SYNC: Joi.boolean().required(),
    DATABASE_URL: Joi.string().required(),
    DATABASE_SSL: Joi.boolean().required(),

    // jwt
    JWT_SECRET: Joi.string().required(),
    COOKIE_SECRET: Joi.string().required(),
    TOKEN_COOKIE_NAME: Joi.string().required(),
    TOKEN_PREFIX: Joi.string().required(),

    // heroku variables
    NPM_CONFIG_PRODUCTION: requiredIn('production', { joiType: Joi.boolean(), defaultValue: false }),
    PROJECT_PATH: requiredIn('production', { joiType: Joi.string(), defaultValue: 'server' }),

    // google auth
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),

    // gsuite
    GOOGLE_CLIENT_EMAIL: productionRequiredString,
    GOOGLE_PRIVATE_KEY: productionRequiredString,
    GOOGLE_PROJECT_ID: productionRequiredString,
    GSUITE_CUSTOMER_ID: productionRequiredString,
    GSUITE_SUBJECT: productionRequiredString,

    // slack
    SLACK_BOT_TOKEN: productionRequiredString,
    SLACK_USER_TOKEN: productionRequiredString,

    // cloudinary
    CLOUDINARY_URL: Joi.string().required(),

    // sendgrid
    SENDGRID_KEY: Joi.string().required(),
  });

  const { error, value: validatedEnvConfig } = envVarsSchema.validate(env, {
    stripUnknown: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return validatedEnvConfig;
};
