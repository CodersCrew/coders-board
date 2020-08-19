import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { User } from '../../users/user.model';
import { UserRole } from '../../users/user.model';
import { RequestUser } from '../typings/RequestUser';

@Injectable()
export class IsAdmin implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const user: RequestUser = ctx.getContext().req.user;
    const userRecord = await getRepository(User).findOne(user.id);

    return userRecord.role === UserRole.ADMIN;
  }
}

export const AdminGuard = () => UseGuards(IsAdmin);
