import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SendSlackMessageInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  channelId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  text: string;
}
