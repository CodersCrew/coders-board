import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';

import { Public } from '../common/decorators';
import { env } from '../common/env';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';

@Resolver(of => Boolean)
@Public()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => Boolean)
  async signIn(@Args('data') input: SignInInput, @Context('req') req: Request) {
    const token = await this.authService.signIn(input);
    const { TOKEN_COOKIE_NAME, TOKEN_PREFIX } = env;

    req.res.status(200).cookie(TOKEN_COOKIE_NAME, `${TOKEN_PREFIX} ${token}`, {
      expires: new Date(Date.now() + 24 * 3600000),
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite: 'strict',
    });

    return true;
  }

  @Mutation(returns => Boolean)
  signOut(@Context('req') req: Request) {
    req.res.clearCookie(env.TOKEN_COOKIE_NAME);
    return true;
  }
}
