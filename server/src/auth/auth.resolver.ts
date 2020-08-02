import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';

@Resolver(of => Boolean)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  @Mutation(returns => Boolean)
  signOut(@Context('req') req: Request) {
    req.res.clearCookie(this.configService.values.TOKEN_COOKIE_NAME);
    return true;
  }
}
