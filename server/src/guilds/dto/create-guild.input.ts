import { Field, InputType } from '@nestjs/graphql';
import { Contains, IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Guild } from '../guild.model';

@InputType()
export class CreateGuildInput implements Partial<Guild> {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  image: string;

  @Field()
  @IsNotEmpty()
  @IsHexColor()
  @Contains('#')
  color: string;

  @Field({ nullable: true, defaultValue: '' })
  @IsOptional()
  @IsString()
  description: string;
}
