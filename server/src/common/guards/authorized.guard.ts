import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class IsAuthorized implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    if (!ctx.getContext().user?.id) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

export const AuthorizedGuard = () => UseGuards(IsAuthorized);
