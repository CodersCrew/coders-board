import { WebAPICallResult } from '@slack/web-api';

import { SlackMember } from './slack-member.interface';

export interface UsersInfoResult extends WebAPICallResult {
  user: SlackMember;
}
