import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { TeamKind } from '../../common/decorators';
import { TeamRole } from '../../common/enums';
import { TeamRoleGuard } from '../../common/guards';
import { GuildPosition } from '../guild-positions/guild-position.model';
import { Guild } from '../guild.model';
import { Clan } from './clan.model';
import { ClansService } from './clans.service';
import { CreateClanInput } from './dto/create-clan.input';
import { DeleteClanArgs } from './dto/delete-clan.args';
import { GetClansArgs } from './dto/get-clans.args';
import { UpdateClanInput } from './dto/update-clan.input';

@Resolver(of => Clan)
@TeamKind('guild')
export class ClansResolver {
  constructor(private readonly clansService: ClansService) {}

  @ResolveField('guild', returns => [Guild])
  async getGuild(@Parent() clan: Clan) {
    return this.clansService.getGuild(clan);
  }

  @ResolveField('positions', returns => [GuildPosition])
  getPositions(@Parent() clan: Clan) {
    return this.clansService.getPositions(clan);
  }

  @Query(returns => [Clan], { name: 'clans' })
  getClans(@Args() args?: GetClansArgs) {
    return this.clansService.findAll(args);
  }

  @Mutation(returns => Clan)
  @TeamRoleGuard(TeamRole.MANAGER, 'data.guildId')
  createClan(@Args('data') input: CreateClanInput) {
    return this.clansService.create(input);
  }

  @Mutation(returns => Clan)
  @TeamRoleGuard(TeamRole.MANAGER, 'data.guildId')
  updateClan(@Args('data') input: UpdateClanInput) {
    return this.clansService.update(input);
  }

  @Mutation(returns => Boolean)
  @TeamRoleGuard(TeamRole.MANAGER, 'guildId')
  deleteClan(@Args() args: DeleteClanArgs) {
    return this.clansService.delete(args.id);
  }
}
