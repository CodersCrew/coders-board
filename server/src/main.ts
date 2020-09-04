import { ValidationPipe } from '@nestjs/common';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';
import path from 'path';

import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { env } from './common/env';
import { IsAuthorized } from './common/guards';
import { helmetMiddleware, rateLimitMiddleware } from './common/middlewares';

const httpsOptions: HttpsOptions =
  env.NODE_ENV === 'development'
    ? {
        key: readFileSync(path.resolve(__dirname, '../../.cert/key.pem')),
        cert: readFileSync(path.resolve(__dirname, '../../.cert/cert.pem')),
      }
    : undefined;

const validationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { httpsOptions });

  app.set('trust proxy', 1);
  app.enableCors({ credentials: true, origin: false });

  app.use(cookieParser(env.COOKIE_SECRET));
  app.use(helmetMiddleware);
  app.use(rateLimitMiddleware);

  const reflector = app.get(Reflector);

  app.useGlobalGuards(new JwtAuthGuard(reflector), new IsAuthorized(reflector));
  app.useGlobalPipes(validationPipe);

  await app.listen(env.PORT);
}

bootstrap();
