import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { TeamRole } from '../../../common/enums/team-role.enum';
import { SquadMember } from '../squad-member.model';

@InputType()
export class CreateSquadMemberInput implements Partial<SquadMember> {
  @Field(type => TeamRole)
  @IsNotEmpty()
  @IsEnum(TeamRole)
  role: TeamRole;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  squadId: string;
}
