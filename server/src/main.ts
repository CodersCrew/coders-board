import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { env } from './common/env';
import { authMiddleware } from './common/middlewares/auth.middleware';
import { helmetConfig } from './helmet.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true });
  app.use(cookieParser());
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path === '/graphql' || req.path.match(/^\/auth/)) {
      next();
    } else {
      helmet(helmetConfig)(req, res, next);
    }
  });
  app.use(authMiddleware());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(env.PORT);
}

bootstrap();
