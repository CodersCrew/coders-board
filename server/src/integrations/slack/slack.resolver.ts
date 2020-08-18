import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AdminGuard } from '../../common/guards';
import { User } from '../../users/user.model';
import { SendSlackMessageInput } from './dto/send-slack-message.input';
import { SyncSlackUserInput } from './dto/sync-slack-user.input';
import { SlackMessage } from './slack-message.model';
import { SlackUser } from './slack-user.model';
import { SlackService } from './slack.service';

@Resolver()
@AdminGuard()
export class SlackResolver {
  constructor(private slackService: SlackService) {}

  @Query(returns => [SlackUser], { name: 'slackUsers' })
  getSlackUsers(): Promise<SlackUser[]> {
    return this.slackService.findAllUsers();
  }

  @Mutation(returns => User, { name: 'syncSlackUser' })
  syncUser(@Args('data') input: SyncSlackUserInput): Promise<User> {
    return this.slackService.syncUser(input);
  }

  @Mutation(returns => SlackMessage, { name: 'sendSlackMessage' })
  sendMessage(@Args('data') input: SendSlackMessageInput): Promise<SlackMessage> {
    return this.slackService.sendMessage(input);
  }
}
