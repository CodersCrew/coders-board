import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class GetUserArgs {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
