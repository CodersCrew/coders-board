import { Global, Module } from '@nestjs/common';

import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { MailerModule } from './mailer/mailer.module';
import { MailerService } from './mailer/mailer.service';

@Global()
@Module({
  imports: [MailerModule, CloudinaryModule],
  providers: [MailerService, CloudinaryService],
  exports: [MailerService, CloudinaryService],
})
export class ServicesModule {}
