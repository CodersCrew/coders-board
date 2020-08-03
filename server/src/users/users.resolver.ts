import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserId } from '../common/decorators/user-id.decorator';
import { AdminGuard } from '../common/guards/admin.guard';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(returns => User, { name: 'user' })
  getUser(@Args('id') id: string) {
    return this.usersService.findById(id);
  }

  @Query(returns => User, { name: 'me' })
  @UseGuards(AuthGuard)
  getMe(@UserId() userId: string) {
    return this.usersService.findById(userId);
  }

  @Query(returns => [User], { name: 'users' })
  getUsers(@Args() args?: GetUsersArgs) {
    return this.usersService.findAll(args);
  }

  @Mutation(returns => User)
  @UseGuards(AdminGuard)
  createUser(@Args('data') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Mutation(returns => Boolean)
  @UseGuards(AdminGuard)
  deleteUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.delete(id);
  }

  @Mutation(returns => [User])
  // @UseGuards(AdminGuard)
  migrateGoogleUsers() {
    return this.usersService.migrateGoogleUsers();
  }
}
