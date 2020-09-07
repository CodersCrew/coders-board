import { CanActivate, Injectable, UseGuards } from '@nestjs/common';

import { env } from '../env';

@Injectable()
export class IsProduction implements CanActivate {
  async canActivate() {
    return env.APP_ENV === 'production';
  }
}

export const ProductionGuard = () => UseGuards(IsProduction);
