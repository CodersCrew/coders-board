export type EnvVariables = {
  NODE_ENV: 'development' | 'test' | 'production';

  PORT: number;
  CLIENT_URL: string;

  // database
  DATABASE_SYNC: boolean;
  DATABASE_URL: string;
  DATABASE_SSL: boolean;

  // jwt
  JWT_SECRET: string;
  COOKIE_SECRET: string;
  TOKEN_COOKIE_NAME: string;
  TOKEN_PREFIX: string;

  // heroku variables
  NPM_CONFIG_PRODUCTION: boolean;
  PROJECT_PATH: string;

  // google auth
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CLIENT_EMAIL: string;
  GOOGLE_PRIVATE_KEY: string;
  GOOGLE_PROJECT_ID: string;

  // gsuite
  GSUITE_CUSTOMER_ID: string;
  GSUITE_SUBJECT: string;

  // slack
  SLACK_BOT_TOKEN: string;
  SLACK_USER_TOKEN: string;

  // cloudinary
  CLOUDINARY_URL: string;
};
