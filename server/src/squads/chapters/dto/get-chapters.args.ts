import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class GetChaptersArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  squadId?: string;
}
