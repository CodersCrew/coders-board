import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { GuildPosition } from '../guild-position.model';

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
}
