import { Field, InputType } from '@nestjs/graphql';
import { Contains, IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Squad } from '../squad.model';

@InputType()
export class CreateSquadInput implements Partial<Squad> {
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
