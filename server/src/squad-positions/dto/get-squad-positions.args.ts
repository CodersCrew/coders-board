import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class GetSquadPositionsArgs {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  squadId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  memberId?: string;
}
