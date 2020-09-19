import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class GetGuildMembersArgs {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  guildId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  archived?: boolean;
}
