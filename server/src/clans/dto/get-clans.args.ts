import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class GetClansArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;
}
