import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserId } from '../common/decorators/user-id.decorator';
import { AdminGuard } from '../common/guards/admin.guard';
import { AuthorizedGuard } from '../common/guards/authorized.guard';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(of => User)
@AuthorizedGuard()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(returns => User, { name: 'user' })
  getUser(@Args('id') id: string) {
    return this.usersService.findById(id);
  }

  @Query(returns => User, { name: 'me' })
  getMe(@UserId() userId: string) {
    return this.usersService.findById(userId);
  }

  @Query(returns => [User], { name: 'users' })
  getUsers(@Args() args?: GetUsersArgs) {
    return this.usersService.findAll(args);
  }

  @Mutation(returns => User)
  @AdminGuard()
  createUser(@Args('data') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Mutation(returns => Boolean)
  @AdminGuard()
  deleteUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.delete(id);
  }

  @Mutation(returns => Boolean)
  @AdminGuard()
  syncWithGoogle() {
    return this.usersService.syncWithGoogle();
  }

  @Mutation(returns => Boolean)
  @AdminGuard()
  syncWithSlack() {
    return this.usersService.syncWithSlack();
  }
}
