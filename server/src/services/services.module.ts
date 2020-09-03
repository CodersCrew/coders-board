import { Global, Module } from '@nestjs/common';

import { MailerModule } from './mailer/mailer.module';
import { MailerService } from './mailer/mailer.service';

@Global()
@Module({
  imports: [MailerModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class ServicesModule {}
