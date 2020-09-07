import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetSlackUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  slackId: string;
}
