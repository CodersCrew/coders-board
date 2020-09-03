import { Expose } from 'class-transformer';
import { IsEmail, IsLowercase, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateGoogleUserDto {
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
  @IsEmail()
  @IsLowercase()
  @Matches(/.*@coderscrew\.pl/)
  primaryEmail: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  recoveryEmail: string;
}
