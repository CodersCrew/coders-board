import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { IsOrganizationEmail } from '../../common/validation';

@InputType()
export class SignInInput {
  @Field()
  @IsNotEmpty()
  @IsOrganizationEmail()
  primaryEmail: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
