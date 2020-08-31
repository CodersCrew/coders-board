import { Field, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SendSlackMessageInput {
  @Expose()
  @Field()
  @IsString()
  @IsNotEmpty()
  channelId: string;

  @Expose()
  @Field()
  @IsString()
  @IsNotEmpty()
  text: string;
}
