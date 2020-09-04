import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { env } from '../common/env';

export type JWTPayload = {
  sub: string;
};

const cookieExtractor = req => {
  let token: string | null = null;

  if (req && req.signedCookies) {
    token = req.signedCookies[env.TOKEN_COOKIE_NAME];
  }

  if (token) {
    token = token.replace(env.TOKEN_PREFIX, '').trim();
  }

  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  async validate(payload: JWTPayload) {
    return { id: payload.sub };
  }
}
