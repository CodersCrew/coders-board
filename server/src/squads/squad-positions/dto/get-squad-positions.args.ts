import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class GetSquadPositionsArgs {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  squadId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  memberId?: string;
}
