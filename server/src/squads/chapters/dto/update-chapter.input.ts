import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreateChapterInput } from './create-chapter.input';

@InputType()
export class UpdateChapterInput extends CreateChapterInput {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
