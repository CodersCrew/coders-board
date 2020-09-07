import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcryptjs';

import { JWTPayload } from '../common/typings';
import { UserRepository } from '../users/user.repository';
import { OAuthUser } from './auth.types';
import { SignInInput } from './dto/sign-in.input';

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

  async signIn({ primaryEmail, password }: SignInInput) {
    const user = await this.userRepository.findOne({ primaryEmail });

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new NotFoundException();
    }

    const payload: JWTPayload = {
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
