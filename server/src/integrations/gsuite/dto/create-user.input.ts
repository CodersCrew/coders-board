import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

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
  @IsEmail()
  @IsNotEmpty()
  @Matches(/.*@coderscrew\.pl$/)
  primaryEmail: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  recoveryEmail: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
