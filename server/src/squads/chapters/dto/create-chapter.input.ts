import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { Chapter } from '../chapter.model';

@InputType()
export class CreateChapterInput implements Partial<Chapter> {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  squadId: string;

  @Field({ nullable: true, defaultValue: '' })
  @IsOptional()
  @IsString()
  description: string;
}
