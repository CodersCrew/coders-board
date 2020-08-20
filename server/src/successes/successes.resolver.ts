import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/user.model';

import { UserId } from '../common/decorators';
import { CreateSuccessInput, DeleteSuccessArgs, GetSuccessesArgs } from './dto';
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

  @Query(returns => [Success], { name: 'successs' })
  getSuccesses(@Args() args?: GetSuccessesArgs) {
    return this.successsService.findAll(args);
  }

  @Mutation(returns => Success)
  createSuccess(@Args('data') input: CreateSuccessInput, @UserId() userId: string) {
    return this.successsService.create(input, userId);
  }

  @Mutation(returns => Boolean)
  deleteSuccess(@Args() args: DeleteSuccessArgs) {
    return this.successsService.delete(args);
  }
}
