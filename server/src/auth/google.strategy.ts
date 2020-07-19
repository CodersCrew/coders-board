import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOptionsWithRequest, VerifyCallback } from 'passport-google-oauth20';

import { ConfigService } from '../config/config.service';
import { OAuthUser } from './auth.types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super(<StrategyOptionsWithRequest>{
      clientID: configService.values.GOOGLE_CLIENT_ID,
      clientSecret: configService.values.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:4000/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    const user: OAuthUser = { profile, accessToken };

    done(null, user);
  }
}
