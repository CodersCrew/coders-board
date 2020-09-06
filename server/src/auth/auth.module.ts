import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { env } from '../common/env';
import { UserRepository } from '../users/user.repository';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';

const providers =
  env.APP_ENV === 'production'
    ? [AuthResolver, AuthService, GoogleStrategy, JwtStrategy]
    : [AuthResolver, AuthService, JwtStrategy];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers,
  controllers: [AuthController],
})
export class AuthModule {}
