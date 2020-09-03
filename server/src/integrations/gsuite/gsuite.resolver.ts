import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AdminGuard } from '../../common/guards';
import { SyncGsuiteUserInput } from './dto/sync-gsuite-user.input';
import { GsuiteUser } from './gsuite-user.model';
import { GsuiteService } from './gsuite.service';

@Resolver()
@AdminGuard()
export class GsuiteResolver {
  constructor(private readonly gsuiteService: GsuiteService) {}

  @Query(returns => [GsuiteUser], { name: 'gsuiteUsers' })
  getGsuiteUsers() {
    return this.gsuiteService.findAllGsuiteUsers();
  }

  @Mutation(returns => Boolean)
  syncGsuiteUser(@Args('data') input: SyncGsuiteUserInput): Promise<boolean> {
    return this.gsuiteService.syncGsuiteUser(input);
  }
}
