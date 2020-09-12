import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import { replace } from 'lodash';

import { EnvVariables } from './env.types';
import { productionRequiredString, requiredInProduction } from './env.utils';

export class EnvConfig {
  constructor() {
    dotenv.config();

    this.envConfig = this.validateEnvVariables(process.env);
  }

  readonly envConfig: EnvVariables;

  private validateEnvVariables = (env: dotenv.DotenvParseOutput): EnvVariables => {
    const appEnvValidation = Joi.string()
      .valid('local', 'review', 'staging', 'production')
      .default('local')
      .validate(env.APP_ENV);

    if (appEnvValidation.error) {
      throw new Error(`Config validation error: ${appEnvValidation.error.message}`);
    }

    const appEnv: EnvVariables['APP_ENV'] = appEnvValidation.value;
    const isProduction = appEnv === 'production';

    const envVarsSchema: Joi.ObjectSchema<EnvVariables> = Joi.object({
      NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),

      PORT: Joi.number().default(4000),
      CLIENT_URL: Joi.string().allow('').default(''),

      // database
      DATABASE_URL: Joi.string().required(),

      // jwt
      JWT_SECRET: Joi.string().required(),
      COOKIE_SECRET: Joi.string().required(),
      TOKEN_COOKIE_NAME: Joi.string().required(),
      TOKEN_PREFIX: Joi.string().required(),

      // heroku variables
      NPM_CONFIG_PRODUCTION: requiredInProduction(isProduction, { joiType: Joi.boolean(), defaultValue: false }),

      // google auth
      GOOGLE_CLIENT_ID: productionRequiredString(isProduction),
      GOOGLE_CLIENT_SECRET: productionRequiredString(isProduction),

      // gsuite
      GOOGLE_CLIENT_EMAIL: productionRequiredString(isProduction),
      GOOGLE_PRIVATE_KEY: productionRequiredString(isProduction),
      GOOGLE_PROJECT_ID: productionRequiredString(isProduction),
      GSUITE_CUSTOMER_ID: productionRequiredString(isProduction),
      GSUITE_SUBJECT: productionRequiredString(isProduction),

      // slack
      SLACK_BOT_TOKEN: productionRequiredString(isProduction),
      SLACK_USER_TOKEN: productionRequiredString(isProduction),

      // cloudinary
      CLOUDINARY_URL: Joi.string().required(),

      // sendgrid
      SENDGRID_KEY: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(env, { stripUnknown: true });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    const config = validatedEnvConfig as EnvVariables;

    return {
      ...config,
      APP_ENV: appEnv,
      GOOGLE_PRIVATE_KEY: config.GOOGLE_PRIVATE_KEY
        ? replace(config.GOOGLE_PRIVATE_KEY, new RegExp('\\\\n', 'g'), '\n')
        : config.GOOGLE_PRIVATE_KEY,
    };
  };
}
