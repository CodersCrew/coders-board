import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

import { TeamRole } from '../team-member.model';

@ArgsType()
export class GetTeamMembersArgs {
  @Field({ defaultValue: true })
  @IsOptional()
  @IsBoolean()
  nested?: boolean;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  teamId: string;

  @Field(type => TeamRole, { nullable: true })
  @IsOptional()
  @IsEnum(TeamRole)
  role?: TeamRole;
}
