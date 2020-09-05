import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import fs from 'fs';

import { EnvVariables } from './env.types';
import { productionRequiredString, requiredInProduction } from './env.utils';

export class EnvConfig {
  constructor(envFilePath: string) {
    const config = dotenv.parse(fs.readFileSync(envFilePath, { encoding: 'utf-8' }));

    this.envConfig = this.validateEnvVariables(config);
  }

  readonly envConfig: EnvVariables;

  private validateEnvVariables = (env: dotenv.DotenvParseOutput): EnvVariables => {
    const isProductionResult = Joi.boolean().optional().default(false).validate(env.IS_PRODUCTION);

    if (isProductionResult.error) {
      throw new Error(`Config validation error: ${isProductionResult.error.message}`);
    }

    const isProduction: EnvVariables['IS_PRODUCTION'] = isProductionResult.value;

    const envVarsSchema: Joi.ObjectSchema<EnvVariables> = Joi.object({
      NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),

      PORT: Joi.number().required(),
      CLIENT_URL: Joi.string().allow('').default(''),

      // database
      DATABASE_SYNC: Joi.boolean().required(),
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

    return {
      ...validatedEnvConfig,
      IS_PRODUCTION: isProduction,
    };
  };
}
