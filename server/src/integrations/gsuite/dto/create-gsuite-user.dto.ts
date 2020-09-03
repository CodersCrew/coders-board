import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsOrganizationEmail } from '../../../common/validation';

export class CreateGsuiteUserDto {
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
  @IsEmail()
  @IsNotEmpty()
  recoveryEmail: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}
