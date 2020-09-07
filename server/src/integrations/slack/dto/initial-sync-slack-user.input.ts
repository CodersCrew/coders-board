import { Field, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class InitialSyncSlackUserInput {
  @Expose()
  @Field()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @Expose()
  @Field()
  @IsString()
  @IsNotEmpty()
  slackId: string;
}
