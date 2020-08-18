import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;
}
