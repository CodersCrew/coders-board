import { Field, InputType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

@InputType()
export class UpdateGoogleUserImageInput {
  @Expose()
  @Field()
  @IsString()
  @IsNotEmpty()
  googleId: string;

  @Expose()
  @Field()
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
