import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { GuildPosition, GuildPositionKind } from '../guild-position.model';

@InputType()
export class CreateGuildPositionInput implements Partial<GuildPosition> {
  @Field()
  @IsNotEmpty()
  @IsDate()
  from: Date;

  @Field(type => GuildPositionKind)
  @IsNotEmpty()
  @IsEnum(GuildPositionKind)
  kind: GuildPositionKind;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  memberId: string;

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
