import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { authMiddleware } from './common/middlewares/auth.middleware';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({ credentials: true, origin: configService.values.CLIENT_URL });
  app.use(cookieParser());
  app.use(helmet());
  app.use(authMiddleware(configService));

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true, forbidNonWhitelisted: true, whitelist: true }));

  await app.listen(configService.values.PORT);
}

bootstrap();
