import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { TeamKind } from '../common/decorators/team-kind.decorator';
import { TeamRole } from '../common/enums/team-role.enum';
import { AdminGuard } from '../common/guards/admin.guard';
import { AuthorizedGuard } from '../common/guards/authorized.guard';
import { TeamRoleGuard } from '../common/guards/team-role.guard';
import { Clan } from './clans/clan.model';
import { CreateGuildInput } from './dto/create-guild.input';
import { DeleteGuildArgs } from './dto/delete-guild.args';
import { GetGuildArgs } from './dto/get-guild.args';
import { GetGuildsArgs } from './dto/get-guilds.args';
import { UpdateGuildInput } from './dto/update-guild.input';
import { GuildMember } from './guild-members/guild-member.model';
import { Guild } from './guild.model';
import { GuildsService } from './guilds.service';

@Resolver(of => Guild)
@TeamKind('guild')
@AuthorizedGuard()
export class GuildsResolver {
  constructor(private readonly guildsService: GuildsService) {}

  @ResolveField('clans', returns => [Clan])
  async getClans(@Parent() guild: Guild) {
    return this.guildsService.getClans(guild.id);
  }

  @ResolveField('members', returns => [GuildMember])
  getMembers(@Parent() guild: Guild) {
    return this.guildsService.getMembers(guild.id);
  }

  @Query(returns => [Guild], { name: 'guilds' })
  getGuilds(@Args() args?: GetGuildsArgs) {
    return this.guildsService.findAll(args);
  }

  @Query(returns => Guild, { name: 'guild' })
  getGuild(@Args() args: GetGuildArgs) {
    return this.guildsService.findByIdOrThrow(args.id);
  }

  @Mutation(returns => Guild)
  @AdminGuard()
  createGuild(@Args('data') input: CreateGuildInput) {
    return this.guildsService.create(input);
  }

  @Mutation(returns => Guild)
  @TeamRoleGuard(TeamRole.MANAGER, 'data.id')
  updateGuild(@Args('data') input: UpdateGuildInput) {
    return this.guildsService.update(input);
  }

  @Mutation(returns => Boolean)
  @TeamRoleGuard(TeamRole.OWNER, 'id')
  deleteGuild(@Args() args: DeleteGuildArgs) {
    return this.guildsService.delete(args.id);
  }
}
