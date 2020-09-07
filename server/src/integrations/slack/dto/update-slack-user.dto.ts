import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { IsOrganizationEmail } from '../../../common/validation';

export class UpdateSlackUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  slackId: string;

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
}
