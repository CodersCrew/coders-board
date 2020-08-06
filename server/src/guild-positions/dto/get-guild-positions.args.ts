import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class GetGuildPositionsArgs {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  guildId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  memberId?: string;
}
