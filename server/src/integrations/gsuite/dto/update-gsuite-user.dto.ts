import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsOrganizationEmail } from '../../../common/validation';

export class UpdateGsuiteUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  googleId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Expose()
  @IsNotEmpty()
  @IsOrganizationEmail()
  primaryEmail: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  recoveryEmail: string;
}
