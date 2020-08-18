import { InternalServerErrorException } from '@nestjs/common';
import { WebAPICallResult } from '@slack/web-api';

export async function slackRequest<R extends WebAPICallResult = WebAPICallResult>(
  slackPromise: Promise<WebAPICallResult>,
): Promise<R> {
  const response = await slackPromise;

  if (!response.ok) {
    throw new InternalServerErrorException(response.error);
  }

  return response as R;
}
