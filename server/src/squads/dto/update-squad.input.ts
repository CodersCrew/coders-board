import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreateSquadInput } from './create-squad.input';

@InputType()
export class UpdateSquadInput extends CreateSquadInput {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
