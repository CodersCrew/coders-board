import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AdminGuard } from '../../common/guards';
import { User } from '../../users/user.model';
import { InitialSyncSlackUserInput } from './dto';
import { SyncSlackUserInput } from './dto/sync-slack-user.input';
import { SlackUser } from './slack-user.model';
import { SlackService } from './slack.service';

@Resolver()
@AdminGuard()
export class SlackResolver {
  constructor(private slackService: SlackService) {}

  @Query(returns => [SlackUser], { name: 'slackUsers' })
  getSlackUsers(): Promise<SlackUser[]> {
    return this.slackService.findAllSlackUsers();
  }

  @Mutation(returns => User, { name: 'initialSyncSlackUser' })
  initialSyncUser(@Args('data') input: InitialSyncSlackUserInput): Promise<User> {
    return this.slackService.initialSyncSlackUser(input);
  }

  @Mutation(returns => User, { name: 'syncSlackUser' })
  syncUser(@Args('data') input: SyncSlackUserInput): Promise<boolean> {
    return this.slackService.syncSlackUser(input);
  }
}
