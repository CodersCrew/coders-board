import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsLowercase, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  @Matches(/.*@coderscrew\.pl/)
  primaryEmail: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  recoveryEmail: string;
}
