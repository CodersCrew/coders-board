import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

import { TeamKind } from '../team.model';

@ArgsType()
export class GetTeamsArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @Field(type => TeamKind, { nullable: true })
  @IsOptional()
  @IsEnum(TeamKind)
  kind?: TeamKind;
}
