import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

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

  @Field(type => [ID], { nullable: true })
  @IsOptional()
  @IsUUID('all', { each: true })
  ids?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  withDeleted?: boolean;
}
