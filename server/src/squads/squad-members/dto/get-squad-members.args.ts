import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class GetSquadMembersArgs {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  squadId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  archived?: boolean;
}
