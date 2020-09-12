import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { User, UserRole } from '../../users/user.model';

@Injectable()
export class IsAdmin implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    const userRecord = await getRepository(User).findOne(user.id);

    return userRecord.role === UserRole.ADMIN;
  }
}

export const AdminGuard = () => UseGuards(IsAdmin);
