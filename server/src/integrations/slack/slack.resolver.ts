import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AdminGuard } from '../../common/guards';
import { User } from '../../users/user.model';
import { InitialSyncSlackUserInput } from './dto';
import { SlackService } from './slack.service';

@Resolver()
@AdminGuard()
export class SlackResolver {
  constructor(private slackService: SlackService) {}

  @Mutation(returns => User)
  initialSyncSlackUser(@Args('data') input: InitialSyncSlackUserInput): Promise<User> {
    return this.slackService.initialSyncSlackUser(input);
  }
}
