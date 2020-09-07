import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetGsuiteUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  googleId: string;
}
