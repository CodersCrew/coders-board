import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebClient } from '@slack/web-api';

import { env } from '../../common/env';
import { pick } from '../../common/utils';
import { UserRepository } from '../../users/user.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { SendSlackMessageInput } from './dto/send-slack-message.input';
import { SyncSlackUserInput } from './dto/sync-slack-user.input';
import { ChatPostMessageResult } from './interfaces/chat-post-message-result.interface';
import { UsersInfoResult } from './interfaces/user-info-result.interface';
import { UsersListResult } from './interfaces/users-list-result.interface';
import { SlackMessage } from './slack-message.model';
import { SlackUser } from './slack-user.model';
import { slackRequest } from './slack.utils';

@Injectable()
export class SlackService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  web = new WebClient(env.SLACK_TOKEN);

  async findAllUsers(): Promise<SlackUser[]> {
    const response = await slackRequest<UsersListResult>(this.web.users.list({ limit: 500 }));

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

  async syncUser({ slackId, userId }: SyncSlackUserInput) {
    const { user: slackUser } = await slackRequest<UsersInfoResult>(this.web.users.info({ user: slackId }));

    const user = await this.userRepository.findOneOrFail(userId);

    await slackRequest(
      this.web.users.profile.set({
        name: 'email',
        value: user.primaryEmail,
        user: slackId,
      }),
    );

    const image = await this.cloudinaryService.uploadUserImage(slackUser.profile.image_192, user.id);
    const thumbnail = await this.cloudinaryService.uploadUserThumbnail(slackUser.profile.image_48, user.id);

    return this.userRepository.save({
      ...user,
      image,
      thumbnail,
      slackId,
    });
  }

  async sendMessage({ channelId, text }: SendSlackMessageInput): Promise<SlackMessage> {
    const { message } = await slackRequest<ChatPostMessageResult>(
      this.web.chat.postMessage({ channel: channelId, text }),
    );

    return new SlackMessage({
      ...pick(message, ['text', 'team', 'user', 'type']),
      botId: message.bot_id,
    });
  }
}
