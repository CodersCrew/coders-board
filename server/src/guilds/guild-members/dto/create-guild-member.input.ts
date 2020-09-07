import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

import { TeamRole } from '../../../common/enums';
import { GuildMember } from '../guild-member.model';

@InputType()
export class CreateGuildMemberInput implements Partial<GuildMember> {
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
  guildId: string;
}
