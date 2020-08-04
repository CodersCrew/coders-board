import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class GetSquadMembersArgs {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  squadId: string;
}
