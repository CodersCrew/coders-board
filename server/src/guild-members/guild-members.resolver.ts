import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { GuildPosition } from '../guild-positions/guild-position.model';
import { Guild } from '../guilds/guild.model';
import { User } from '../users/user.model';
import { CreateGuildMemberInput } from './dto/create-guild-member.input';
import { DeleteGuildMemberArgs } from './dto/delete-guild-member.args';
import { GetGuildMembersArgs } from './dto/get-guild-members.args';
import { UpdateGuildMemberInput } from './dto/update-guild-member.input';
import { GuildMember } from './guild-member.model';
import { GuildMembersService } from './guild-members.service';

@Resolver(of => GuildMember)
export class GuildMembersResolver {
  constructor(private readonly guildMembersService: GuildMembersService) {}

  @ResolveField('user', returns => User)
  async getUser(@Parent() guildMember: GuildMember) {
    return this.guildMembersService.getUser(guildMember.id);
  }

  @ResolveField('guild', returns => Guild)
  async getGuild(@Parent() guildMember: GuildMember) {
    return this.guildMembersService.getGuild(guildMember.id);
  }

  @ResolveField('positions', returns => GuildPosition)
  async getPositions(@Parent() guildMember: GuildMember) {
    return this.guildMembersService.getPositions(guildMember.id);
  }

  @Query(returns => [GuildMember], { name: 'guildMembers' })
  getGuildMembers(@Args() args?: GetGuildMembersArgs) {
    return this.guildMembersService.findAll(args);
  }

  @Mutation(returns => GuildMember)
  createGuildMember(@Args('data') input: CreateGuildMemberInput) {
    return this.guildMembersService.create(input);
  }

  @Mutation(returns => GuildMember)
  updateGuildMember(@Args('data') input: UpdateGuildMemberInput) {
    return this.guildMembersService.update(input);
  }

  @Mutation(returns => Boolean)
  deleteGuildMember(@Args() args: DeleteGuildMemberArgs) {
    return this.guildMembersService.delete(args.id);
  }
}
