import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

// import { fullConsoleLog } from 'src/common/utils';
import { env } from '../../common/env';
import { UsersListResult } from './interfaces/users-list-result.interface';

@Injectable()
export class SlackService {
  web = new WebClient(env.SLACK_TOKEN);

  async findAllUsers() {
    const response = (await this.web.users.list({ limit: 500 })) as UsersListResult;

    if (!response.ok) return [];

    return response.members
      .filter(user => !user.deleted && !user.is_bot && user.name !== 'slackbot')
      .map(user => {
        const { id, profile } = user;

        return {
          slackId: id,
          image: profile.image_192,
          thumbnail: profile.image_48,
          primaryEmail: profile.email,
          fullName: profile.real_name,
        };
      });
  }
}
