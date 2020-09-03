import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateGoogleUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  @Matches(/.*@coderscrew\.pl$/)
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
