import { Global, Injectable } from '@nestjs/common';
import sendgridMail from '@sendgrid/mail';

import { env } from '../../common/env';
import { transformAndValidate } from '../../common/utils';
import { InvitationEmailDto } from './dto/invitation-email.dto';

@Global()
@Injectable()
export class MailerService {
  constructor() {
    this.sendgrid.setApiKey(env.SENDGRID_KEY);
  }

  sendgrid = sendgridMail;

  async sendInvitationEmail(data: InvitationEmailDto) {
    const { to, email, password } = await transformAndValidate(InvitationEmailDto, data);

    await this.sendgrid.send({
      to,
      from: 'codersboard@coderscrew.pl',
      templateId: 'd-632bcf59ea92429ca0b0884f22d1fe49',
      dynamicTemplateData: { email, password },
    });

    return true;
  }
}