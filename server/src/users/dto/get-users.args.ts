import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { UserRole } from '../user.model';

@ArgsType()
export class GetUsersArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(type => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
