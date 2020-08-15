import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import { env } from '../common/env';
import { AuthService } from './auth.service';

@Resolver(of => Boolean)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => Boolean)
  signOut(@Context('req') req: Request) {
    req.res.clearCookie(env.TOKEN_COOKIE_NAME);
    return true;
  }
}
