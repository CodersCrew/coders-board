import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsLowercase, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from 'class-validator';

import { Chapter } from '../chapter.model';

@InputType()
export class CreateChapterInput implements Partial<Chapter> {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  @Matches(/.*-chapter@coderscrew\.pl/)
  email: string;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  squadId: string;

  @Field({ nullable: true, defaultValue: '' })
  @IsOptional()
  @IsString()
  description: string;
}
