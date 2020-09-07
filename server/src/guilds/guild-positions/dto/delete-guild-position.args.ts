import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class DeleteGuildPositionArgs {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  guildId: string;
}
