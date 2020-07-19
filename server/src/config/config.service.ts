import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { EnvConfig } from './config.types';
import { requiredInProduction } from './config.utils';

dotenv.config();

@Injectable()
export class ConfigService {
  constructor() {
    const config = process.env;
    this.envConfig = this.validateInput(config);
  }

  private readonly envConfig: EnvConfig;

  isProduction = process.env.NODE_ENV === 'production';

  private validateInput(envConfig: dotenv.DotenvParseOutput): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema<EnvConfig> = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'test', 'production')
        .default('development'),

      PORT: Joi.number().required(),
      CLIENT_URL: Joi.string().required(),

      // database
      DATABASE_SYNC: Joi.boolean().required(),
      DATABASE_URL: Joi.string().required(),
      DATABASE_SSL: Joi.boolean().required(),

      // jwt
      JWT_SECRET: Joi.string().required(),
      TOKEN_COOKIE_NAME: Joi.string().required(),
      TOKEN_PREFIX: Joi.string().required(),

      // heroku variables
      NPM_CONFIG_PRODUCTION: requiredInProduction({ joiType: Joi.boolean(), defaultValue: false }),
      PROJECT_PATH: requiredInProduction({ joiType: Joi.string(), defaultValue: 'server' }),

      // google auth
      GOOGLE_CLIENT_ID: Joi.string().required(),
      GOOGLE_CLIENT_SECRET: Joi.string().required(),

      // gsuite
      GSUITE_CUSTOMER_ID: Joi.string().required(),
      GSUITE_SUBJECT: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig, {
      stripUnknown: true,
    });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  get values(): EnvConfig {
    return this.envConfig;
  }
}
