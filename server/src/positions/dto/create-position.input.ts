import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { Position } from '../position.model';

@InputType()
export class CreatePositionInput implements Partial<Position> {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field({ nullable: true, defaultValue: '' })
  @IsOptional()
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  clanId?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  guildId?: string;
}
