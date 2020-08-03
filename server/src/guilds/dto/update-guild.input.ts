import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { CreateGuildInput } from './create-guild.input';

@InputType()
export class UpdateGuildInput extends CreateGuildInput {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
