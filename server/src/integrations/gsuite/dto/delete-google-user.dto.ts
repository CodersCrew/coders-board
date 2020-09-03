import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteGoogleUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  googleId: string;
}
