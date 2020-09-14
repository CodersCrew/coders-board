import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { GuildPosition } from '../guild-position.model';

@InputType()
export class CreateGuildPositionInput implements Partial<GuildPosition> {
  @Field()
  @IsNotEmpty()
  @IsDate()
  from: Date;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  positionId: string;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  memberId: string;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  guildId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  to?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  clanId?: string;
}
