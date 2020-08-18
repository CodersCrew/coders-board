import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AdminGuard } from '../../common/guards';
import { GsuiteUser } from './gsuite-user.model';
import { GsuiteService } from './gsuite.service';

@Resolver()
@AdminGuard()
export class GsuiteResolver {
  constructor(private readonly gsuiteService: GsuiteService) {}

  @Query(returns => [GsuiteUser], { name: 'gsuiteUsers' })
  getGsuiteUsers() {
    return this.gsuiteService.findAllUsers();
  }

  @Mutation(returns => Boolean)
  deleteGsuiteUser(@Args('id') id: string) {
    return this.gsuiteService.deleteUser({ id });
  }
}
