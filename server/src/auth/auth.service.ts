import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { JWTPayload } from '../common/typings';
import { UserRepository } from '../users/user.repository';
import { OAuthUser } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authorizeGoogleUser({ profile }: OAuthUser) {
    const user = await this.userRepository.findOne({ googleId: profile.id });

    if (!user) {
      throw new NotFoundException();
    }

    const payload: JWTPayload = {
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
