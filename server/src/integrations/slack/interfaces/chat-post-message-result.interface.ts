import { WebAPICallResult } from '@slack/web-api';

export interface ChatPostMessageResult extends WebAPICallResult {
  message: {
    bot_id: string;
    type: string;
    text: string;
    user: string;
    team: string;
  };
}
