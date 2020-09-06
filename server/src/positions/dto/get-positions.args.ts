import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { PositionScope } from '../position.model';

@ArgsType()
export class GetPositionsArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  guildId?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  clanId?: string;

  @Field(type => [PositionScope], { nullable: true })
  @IsOptional()
  @IsEnum(PositionScope, { each: true })
  scopes?: PositionScope[];
}
