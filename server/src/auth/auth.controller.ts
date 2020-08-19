import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { Public } from '../common/decorators';
import { env } from '../common/env';
import { AuthService } from './auth.service';
import { OAuthRequest } from './auth.types';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: OAuthRequest, @Res() res: Response) {
    try {
      const token = await this.authService.authorizeGoogleUser(req.user);
      const { TOKEN_COOKIE_NAME, TOKEN_PREFIX } = env;

      res
        .status(200)
        .cookie(TOKEN_COOKIE_NAME, TOKEN_PREFIX + token, {
          expires: new Date(Date.now() + 24 * 3600000),
          httpOnly: true,
          secure: true,
          signed: true,
          sameSite: 'strict',
        })
        .redirect(`${env.CLIENT_URL}/login/success`);
    } catch (ex) {
      console.error(ex);
      return res.redirect(`${env.CLIENT_URL}/login/failure`);
    }

    return true;
  }
}
