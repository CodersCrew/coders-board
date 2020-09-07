import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreateClanInput } from './create-clan.input';

@InputType()
export class UpdateClanInput extends CreateClanInput {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
