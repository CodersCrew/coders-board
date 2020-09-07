import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreatePositionInput } from './create-position.input';

@InputType()
export class UpdatePositionInput extends CreatePositionInput {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id?: string;
}
