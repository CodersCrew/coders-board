import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class GetSlackUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  slackId: string;
}
