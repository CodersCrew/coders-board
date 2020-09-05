import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IsOrganizationEmail } from '../../common/validation';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsOrganizationEmail()
  primaryEmail: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  recoveryEmail: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  password?: string;
}
