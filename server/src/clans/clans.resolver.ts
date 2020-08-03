import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { GuildPosition } from '../guild-positions/guild-position.model';
import { Guild } from '../guilds/guild.model';
import { Clan } from './clan.model';
import { ClansService } from './clans.service';
import { CreateClanInput } from './dto/create-clan.input';
import { DeleteClanArgs } from './dto/delete-clan.args';
import { GetClanArgs } from './dto/get-clan.args';
import { GetClansArgs } from './dto/get-clans.args';
import { UpdateClanInput } from './dto/update-clan.input';

@Resolver(of => Clan)
export class ClansResolver {
  constructor(private readonly clansService: ClansService) {}

  @ResolveField('guild', returns => [Guild])
  async getGuild(@Parent() clan: Clan) {
    return this.clansService.getGuild(clan.id);
  }

  @ResolveField('positions', returns => [GuildPosition])
  getPositions(@Parent() clan: Clan) {
    return this.clansService.getPositions(clan.id);
  }

  @Query(returns => [Clan], { name: 'clans' })
  getClans(@Args() args?: GetClansArgs) {
    return this.clansService.findAll(args);
  }

  @Query(returns => Clan, { name: 'clan' })
  getClan(@Args() args: GetClanArgs) {
    return this.clansService.findByIdOrThrow(args.id);
  }

  @Mutation(returns => Clan)
  createClan(@Args('data') input: CreateClanInput) {
    return this.clansService.create(input);
  }

  @Mutation(returns => Clan)
  updateClan(@Args('data') input: UpdateClanInput) {
    return this.clansService.update(input);
  }

  @Mutation(returns => Boolean)
  deleteClan(@Args() args: DeleteClanArgs) {
    return this.clansService.delete(args.id);
  }
}
