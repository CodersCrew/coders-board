import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GuildMember } from 'src/guilds/guild-members/guild-member.model';
import { SquadMember } from 'src/squads/squad-members/squad-member.model';

import { UserId } from '../common/decorators';
import { AdminGuard } from '../common/guards';
import { CreateUserInput } from './dto/create-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField('guilds', returns => [GuildMember])
  getGuilds(@Parent() user: User) {
    return this.usersService.getGuilds(user);
  }

  @ResolveField('squads', returns => [SquadMember])
  getSquads(@Parent() user: User) {
    return this.usersService.getSquads(user);
  }

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
}
