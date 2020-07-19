import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class GetPositionsArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  teamId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  global?: boolean;
}
