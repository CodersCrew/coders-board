import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { TeamKind } from '../../common/decorators/team-kind.decorator';
import { TeamRole } from '../../common/enums/team-role.enum';
import { AuthorizedGuard } from '../../common/guards/authorized.guard';
import { TeamRoleGuard } from '../../common/guards/team-role.guard';
import { Clan } from '../clans/clan.model';
import { GuildMember } from '../guild-members/guild-member.model';
import { CreateGuildPositionInput } from './dto/create-guild-position.input';
import { DeleteGuildPositionArgs } from './dto/delete-guild-position.args';
import { GetGuildPositionsArgs } from './dto/get-guild-positions.args';
import { UpdateGuildPositionInput } from './dto/update-guild-position.input';
import { GuildPosition } from './guild-position.model';
import { GuildPositionsService } from './guild-positions.service';

@Resolver(of => GuildPosition)
@TeamKind('guild')
@AuthorizedGuard()
export class GuildPositionsResolver {
  constructor(private readonly guildPositionsService: GuildPositionsService) {}

  @ResolveField('member', returns => GuildMember)
  async getMember(@Parent() guildPosition: GuildPosition) {
    return this.guildPositionsService.getMember(guildPosition.id);
  }

  @ResolveField('clan', returns => Clan, { nullable: true })
  async getClan(@Parent() guildPosition: GuildPosition) {
    return this.guildPositionsService.getClan(guildPosition.id);
  }

  @Query(returns => [GuildPosition], { name: 'guildPositions' })
  getGuildPositions(@Args() args?: GetGuildPositionsArgs) {
    return this.guildPositionsService.findAll(args);
  }

  @Mutation(returns => GuildPosition)
  @TeamRoleGuard(TeamRole.MANAGER, 'data.guildId')
  createGuildPosition(@Args('data') input: CreateGuildPositionInput) {
    return this.guildPositionsService.create(input);
  }

  @Mutation(returns => GuildPosition)
  @TeamRoleGuard(TeamRole.MANAGER, 'data.guildId')
  updateGuildPosition(@Args('data') input: UpdateGuildPositionInput) {
    return this.guildPositionsService.update(input);
  }

  @Mutation(returns => Boolean)
  @TeamRoleGuard(TeamRole.MANAGER, 'guildId')
  deleteGuildPosition(@Args() args: DeleteGuildPositionArgs) {
    return this.guildPositionsService.delete(args.id);
  }
}
