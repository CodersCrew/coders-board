import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AdminGuard } from '../../common/guards';
import { SyncGoogleUserInput } from './dto/sync-google-user.input';
import { GsuiteUser } from './gsuite-user.model';
import { GsuiteService } from './gsuite.service';

@Resolver()
@AdminGuard()
export class GsuiteResolver {
  constructor(private readonly gsuiteService: GsuiteService) {}

  @Query(returns => [GsuiteUser], { name: 'gsuiteUsers' })
  getGsuiteUsers() {
    return this.gsuiteService.findAllGoogleUsers();
  }

  @Mutation(returns => Boolean, { name: 'syncGsuiteUser' })
  syncUser(@Args('data') input: SyncGoogleUserInput): Promise<boolean> {
    return this.gsuiteService.syncGoogleUser(input);
  }
}
