import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class GetGuildMembersArgs {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  guildId: string;
}
