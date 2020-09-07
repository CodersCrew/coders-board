import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class GetGuildMembersArgs {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  guildId: string;
}
