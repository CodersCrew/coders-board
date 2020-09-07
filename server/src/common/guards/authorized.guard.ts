import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class IsAuthorized implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [context.getHandler(), context.getClass()]);

    if (isPublic) return true;

    const ctx = GqlExecutionContext.create(context);

    if (!ctx.getContext().req.user?.id) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

export const AuthorizedGuard = () => UseGuards(IsAuthorized);
