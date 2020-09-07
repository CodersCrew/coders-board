import { ConflictException, Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import crypto from 'crypto';

import { env } from '../../common/env';
import { pick, transformAndValidate } from '../../common/utils';
import { UserRepository } from '../../users/user.repository';
import {
  GetSlackUserDto,
  InitialSyncSlackUserInput,
  SendSlackMessageDto,
  SyncSlackUserInput,
  UpdateSlackUserDto,
} from './dto';
import { ChatPostMessageResult } from './interfaces/chat-post-message-result.interface';
import { UsersInfoResult } from './interfaces/user-info-result.interface';
import { UsersListResult } from './interfaces/users-list-result.interface';
import { SlackMessage } from './slack-message.model';
import { SlackUser } from './slack-user.model';
import { slackRequest } from './slack.utils';

@Injectable()
export class SlackService {
  constructor(private readonly userRepository: UserRepository) {
    if (env.APP_ENV === 'production') {
      this.slackBot = new WebClient(env.SLACK_BOT_TOKEN);
      this.slackAdmin = new WebClient(env.SLACK_USER_TOKEN);
    }
  }

  slackBot: WebClient;
  slackAdmin: WebClient;

  async findAllSlackUsers(): Promise<SlackUser[]> {
    const response = await slackRequest<UsersListResult>(this.slackBot.users.list({ limit: 500 }));

    return response.members
      .filter(user => !user.deleted && !user.is_bot && user.name !== 'slackbot')
      .map(
        user =>
          new SlackUser({
            id: user.id,
            image: user.profile.image_192,
            thumbnail: user.profile.image_48,
            primaryEmail: user.profile.email,
            fullName: user.profile.real_name,
          }),
      );
  }

  async initialSyncSlackUser(input: InitialSyncSlackUserInput) {
    const { slackId, userId } = await transformAndValidate(InitialSyncSlackUserInput, input);

    if (env.APP_ENV !== 'production') {
      const user = await this.userRepository.findOneOrFail(userId);
      const slackId = crypto.randomBytes(12).toString('hex');

      return this.userRepository.save({
        ...user,
        slackId,
      });
    }

    const slackUser = await this.getSlackUser({ slackId });

    if (slackUser.deleted) {
      throw new ConflictException('You cannot sync a deleted user');
    }

    const user = await this.userRepository.findOneOrFail(userId);

    if (user.slackId) {
      throw new ConflictException('This user is already synced');
    }

    await this.updateSlackUser({ ...pick(user, ['firstName', 'lastName', 'primaryEmail']), slackId });

    return this.userRepository.save({
      ...user,
      slackId,
    });
  }

  async syncSlackUser(input: SyncSlackUserInput) {
    const { slackId } = await transformAndValidate(SyncSlackUserInput, input);
    const user = await this.userRepository.findOneOrFail({ slackId });
    const slackUser = await this.getSlackUser({ slackId: user.slackId });

    if (slackUser.deleted) {
      throw new ConflictException('You cannot sync a deleted user');
    }

    await this.updateSlackUser({ ...pick(user, ['firstName', 'lastName', 'primaryEmail']), slackId });

    return true;
  }

  async getSlackUser(input: GetSlackUserDto) {
    const { slackId } = await transformAndValidate(GetSlackUserDto, input);
    const { user: slackUser } = await slackRequest<UsersInfoResult>(this.slackBot.users.info({ user: slackId }));

    return slackUser;
  }

  private async updateSlackUser(input: UpdateSlackUserDto) {
    const { slackId, ...slackUserInput } = await transformAndValidate(UpdateSlackUserDto, input);

    await slackRequest<UsersInfoResult>(
      this.slackAdmin.users.profile.set({
        user: slackId,
        profile: JSON.stringify({
          first_name: slackUserInput.firstName,
          last_name: slackUserInput.lastName,
          email: slackUserInput.primaryEmail,
        }),
      }),
    );

    return true;
  }

  async sendSlackMessage(input: SendSlackMessageDto): Promise<SlackMessage> {
    const { channelId, text } = await transformAndValidate(SendSlackMessageDto, input);

    const { message } = await slackRequest<ChatPostMessageResult>(
      this.slackBot.chat.postMessage({ channel: channelId, text }),
    );

    return new SlackMessage({
      ...pick(message, ['text', 'team', 'user', 'type']),
      botId: message.bot_id,
    });
  }
}
