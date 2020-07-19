import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

import { TeamMember, TeamRole } from '../team-member.model';

@InputType()
export class CreateTeamMemberInput implements Partial<TeamMember> {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  teamId: string;

  @Field(type => TeamRole, { nullable: true })
  @IsEnum(TeamRole)
  @IsOptional()
  role: TeamRole;
}
