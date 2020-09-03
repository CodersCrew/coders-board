import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsOrganizationEmail } from '../../../common/validation';

export class InvitationEmailDto {
  @Expose()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOrganizationEmail()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}
