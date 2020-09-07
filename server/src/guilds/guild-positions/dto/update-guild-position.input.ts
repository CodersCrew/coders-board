import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreateGuildPositionInput } from './create-guild-position.input';

@InputType()
export class UpdateGuildPositionInput extends CreateGuildPositionInput {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
