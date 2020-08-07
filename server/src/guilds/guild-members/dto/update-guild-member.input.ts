import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { TeamRole } from '../../../common/enums/team-role.enum';
import { GuildMember } from '../guild-member.model';

@InputType()
export class UpdateGuildMemberInput implements Partial<GuildMember> {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field(type => TeamRole)
  @IsNotEmpty()
  @IsEnum(TeamRole)
  role: TeamRole;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  guildId: string;
}
