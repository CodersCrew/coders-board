import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { GuildPosition, GuildPositionKind } from '../guild-position.model';

@InputType()
export class UpdateGuildPositionInput implements Partial<GuildPosition> {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  from: Date;

  @Field(type => GuildPositionKind)
  @IsNotEmpty()
  @IsEnum(GuildPositionKind)
  kind: GuildPositionKind;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  to?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
