import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class GetClansArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(type => ID)
  @IsOptional()
  @IsUUID()
  guildId: string;
}
