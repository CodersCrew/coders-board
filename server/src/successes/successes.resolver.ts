import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { UserId } from '../common/decorators';
import { AdminGuard } from '../common/guards';
import { User } from '../users/user.model';
import { CreateSuccessInput, DeleteSuccessArgs, GetSuccessesArgs, UpdateSuccessInput } from './dto';
import { Success } from './success.model';
import { SuccessesService } from './successes.service';

@Resolver(of => Success)
export class SuccessesResolver {
  constructor(private successsService: SuccessesService) {}

  @ResolveField('users', returns => [User])
  async getUsers(@Parent() success: Success) {
    return this.successsService.getUsers(success);
  }

  @ResolveField('creator', returns => User)
  async getCreator(@Parent() success: Success) {
    return this.successsService.getCreator(success);
  }

  @Query(returns => [Success], { name: 'successes' })
  getSuccesses(@Args() args?: GetSuccessesArgs) {
    return this.successsService.findAll(args);
  }

  @Mutation(returns => Success)
  @AdminGuard()
  createSuccess(@Args('data') input: CreateSuccessInput, @UserId() userId: string) {
    return this.successsService.create(input, userId);
  }

  @Mutation(returns => Success)
  @AdminGuard()
  updateSuccess(@Args('data') input: UpdateSuccessInput) {
    return this.successsService.update(input);
  }

  @Mutation(returns => Boolean)
  @AdminGuard()
  deleteSuccess(@Args() args: DeleteSuccessArgs) {
    return this.successsService.delete(args);
  }
}
