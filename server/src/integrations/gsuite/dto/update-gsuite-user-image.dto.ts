import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateGsuiteUserImageDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  googleId: string;

  @Expose()
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
