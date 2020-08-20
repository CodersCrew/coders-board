import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreateSuccessInput } from './create-success.input';

@InputType()
export class UpdateSuccessInput extends CreateSuccessInput {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
