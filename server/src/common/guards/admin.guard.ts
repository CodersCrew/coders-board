import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { User } from '../../users/user.model';
import { UserRole } from '../../users/user.model';
import { RequestUser } from '../typings/RequestUser';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const user: RequestUser = ctx.getContext().user;
    const userRecord = await getRepository(User).findOne(user.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (userRecord.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }

    return true;
  }
}
