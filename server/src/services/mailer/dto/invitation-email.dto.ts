import { Expose } from 'class-transformer';
import { IsEmail, IsLowercase, IsNotEmpty, IsString, Matches } from 'class-validator';

export class InvitationEmailDto {
  @Expose()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @Expose()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsLowercase()
  @Matches(/.*@coderscrew\.pl/)
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}
