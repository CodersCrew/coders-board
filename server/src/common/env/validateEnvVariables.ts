import Joi from '@hapi/joi';
import dotenv from 'dotenv';

import { EnvVariables } from './env.types';
import { requiredIn } from './env.utils';

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
    GOOGLE_CLIENT_EMAIL: Joi.string().required(),
    GOOGLE_PRIVATE_KEY: Joi.string().required(),
    GOOGLE_PROJECT_ID: Joi.string().required(),

    // gsuite
    GSUITE_CUSTOMER_ID: Joi.string().required(),
    GSUITE_SUBJECT: Joi.string().required(),

    // slack
    SLACK_BOT_TOKEN: Joi.string().required(),
    SLACK_USER_TOKEN: Joi.string().required(),

    // cloudinary
    CLOUDINARY_URL: Joi.string().required(),
  });

  const { error, value: validatedEnvConfig } = envVarsSchema.validate(env, {
    stripUnknown: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return validatedEnvConfig;
};
