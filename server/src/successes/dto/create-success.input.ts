import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { Success, SuccessType } from '../success.model';

@InputType()
export class CreateSuccessInput implements Partial<Success> {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @Field(type => SuccessType)
  @IsNotEmpty()
  @IsEnum(SuccessType)
  type: SuccessType;

  @Field(type => [ID])
  @IsNotEmpty()
  @IsUUID('all', { each: true })
  usersIds: string[];
}
