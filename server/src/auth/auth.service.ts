import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JWTPayload } from '../common/typings/JWTPayload';
import { UsersService } from '../users/users.service';
import { OAuthUser } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async authorizeGoogleUser({ profile }: OAuthUser) {
    const user = await this.usersService.findByGoogleId(profile.id);

    if (!user) {
      throw new NotFoundException();
    }

    const payload: JWTPayload = {
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
