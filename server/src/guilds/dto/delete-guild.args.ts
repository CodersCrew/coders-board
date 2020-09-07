import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class DeleteGuildArgs {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
