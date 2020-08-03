import { Field, InputType } from '@nestjs/graphql';
import { Contains, IsEmail, IsHexColor, IsLowercase, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

import { Guild } from '../guild.model';

@InputType()
export class CreateGuildInput implements Partial<Guild> {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  @Matches(/.*-guild@coderscrew\.pl/)
  email: string;

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
