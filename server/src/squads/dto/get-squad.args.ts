import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class GetSquadArgs {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
