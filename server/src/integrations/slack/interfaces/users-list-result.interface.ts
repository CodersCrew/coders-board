import { WebAPICallResult } from '@slack/web-api';

import { SlackMember } from './slack-member.interface';

export interface UsersListResult extends WebAPICallResult {
  members: SlackMember[];
}
