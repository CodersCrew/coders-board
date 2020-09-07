import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendSlackMessageDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  channelId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  text: string;
}
