import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { Position, PositionScope } from '../position.model';

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

  @Field(type => [PositionScope])
  @IsOptional()
  @IsEnum(PositionScope, { each: true })
  scopes: PositionScope[];

  @Field({ nullable: true, defaultValue: '' })
  @IsOptional()
  @IsString()
  image?: string;

  @Field(type => ID, { nullable: true, defaultValue: null })
  @IsOptional()
  @IsUUID()
  clanId?: string;

  @Field(type => ID, { nullable: true, defaultValue: null })
  @IsOptional()
  @IsUUID()
  guildId?: string;
}
