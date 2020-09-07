import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { SuccessType } from '../success.model';

@ArgsType()
export class GetSuccessesArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(type => SuccessType, { nullable: true })
  @IsOptional()
  @IsEnum(SuccessType)
  type?: SuccessType;
}
