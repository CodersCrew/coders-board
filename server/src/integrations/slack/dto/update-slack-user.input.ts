import { Field, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsEmail, IsLowercase, IsNotEmpty, IsString, Matches } from 'class-validator';

@InputType()
export class UpdateSlackUserInput {
  @Expose()
  @Field()
  @IsString()
  @IsNotEmpty()
  slackId: string;

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
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  @Matches(/.*@coderscrew\.pl/)
  primaryEmail: string;
}
