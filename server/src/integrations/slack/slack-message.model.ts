import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SlackMessage {
  constructor(data: SlackMessage) {
    Object.assign(this, data);
  }

  @Field()
  text: string;

  @Field()
  user: string;

  @Field()
  botId: string;

  @Field()
  type: string;
}
