import { Field, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

@InputType()
export class CreateGoogleUserInput {
  @Expose()
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Expose()
  @Field()
  @IsEmail()
  @IsNotEmpty()
  @Matches(/.*@coderscrew\.pl$/)
  primaryEmail: string;

  @Expose()
  @Field()
  @IsEmail()
  @IsNotEmpty()
  recoveryEmail: string;

  @Expose()
  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
