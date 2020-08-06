import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class GetSquadMembersArgs {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  squadId: string;
}
