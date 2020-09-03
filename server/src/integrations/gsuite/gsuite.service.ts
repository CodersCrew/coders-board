import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { admin_directory_v1, google } from 'googleapis';
import fetch from 'node-fetch';

import { env } from '../../common/env';
import { pick, transformAndValidate } from '../../common/utils';
import { UserRepository } from '../../users/user.repository';
import { CreateGoogleUserDto, DeleteGoogleUserDto, UpdateGoogleUserDto, UpdateGoogleUserImageDto } from './dto';
import { SyncGoogleUserInput } from './dto/sync-google-user.input';
import { GsuiteUser } from './gsuite-user.model';

const imageToBase64 = async (url: string) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  const base64 = buffer.toString('base64');
  const safeBase64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  return safeBase64;
};

export const toBase64 = file => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

@Injectable()
export class GsuiteService {
  constructor(private readonly userRepository: UserRepository) {
    this.initialize();
  }

  admin: admin_directory_v1.Admin;

  private async initialize() {
    const auth = new google.auth.GoogleAuth({
      clientOptions: {
        subject: env.GSUITE_SUBJECT,
      },
      credentials: {
        client_email: env.GOOGLE_CLIENT_EMAIL,
        private_key: env.GOOGLE_PRIVATE_KEY,
      },
      scopes: [
        'https://www.googleapis.com/auth/admin.directory.user',
        'https://www.googleapis.com/auth/admin.directory.group',
      ],
      projectId: env.GOOGLE_PROJECT_ID,
    });

    this.admin = google.admin({
      version: 'directory_v1',
      auth,
    });
  }

  async findAllGoogleUsers() {
    const response = await this.admin.users.list({
      customer: env.GSUITE_CUSTOMER_ID,
      maxResults: 500,
    });

    return response.data.users
      .filter(user => !user.orgUnitPath.includes('Bots'))
      .map(
        user =>
          new GsuiteUser({
            id: user.id,
            firstName: user.name.givenName,
            lastName: user.name.familyName,
            primaryEmail: user.primaryEmail,
            recoveryEmail: user.recoveryEmail,
          }),
      );
  }

  async createGoogleUser(input: CreateGoogleUserDto) {
    const googleUserInput = await transformAndValidate(CreateGoogleUserDto, input);
    const password = createHash('md5').update(googleUserInput.password).digest('hex');

    const response = await this.admin.users.insert({
      requestBody: {
        name: {
          familyName: googleUserInput.lastName,
          givenName: googleUserInput.firstName,
          fullName: `${googleUserInput.firstName} ${googleUserInput.lastName}`,
        },
        primaryEmail: googleUserInput.primaryEmail,
        recoveryEmail: googleUserInput.recoveryEmail,
        password,
        changePasswordAtNextLogin: true,
        hashFunction: 'MD5',
      },
    });

    return new GsuiteUser({
      id: response.data.id,
      ...pick(googleUserInput, ['firstName', 'lastName', 'primaryEmail', 'recoveryEmail']),
    });
  }

  async syncGoogleUser(input: SyncGoogleUserInput) {
    const { googleId } = await transformAndValidate(SyncGoogleUserInput, input);
    const user = await this.userRepository.findOneOrFail({ googleId });

    await this.updateGoogleUser({
      ...pick(user, ['firstName', 'lastName', 'primaryEmail', 'recoveryEmail']),
      googleId,
    });

    return true;
  }

  private async updateGoogleUser(input: UpdateGoogleUserDto) {
    const { googleId, ...googleUserInput } = await transformAndValidate(UpdateGoogleUserDto, input);

    await this.admin.users.update({
      userKey: googleId,
      requestBody: {
        name: {
          familyName: googleUserInput.lastName,
          givenName: googleUserInput.firstName,
          fullName: `${googleUserInput.firstName} ${googleUserInput.lastName}`,
        },
        primaryEmail: googleUserInput.primaryEmail,
        recoveryEmail: googleUserInput.recoveryEmail,
      },
    });

    return true;
  }

  async deleteGoogleUser(input: DeleteGoogleUserDto) {
    const { googleId } = await transformAndValidate(DeleteGoogleUserDto, input);
    await this.admin.users.delete({ userKey: googleId });

    return true;
  }

  async updateGoogleUserImage(input: UpdateGoogleUserImageDto) {
    const { googleId, imageUrl } = await transformAndValidate(UpdateGoogleUserImageDto, input);
    const photoData = await imageToBase64(imageUrl);

    await this.admin.users.photos.update({ userKey: googleId, requestBody: { photoData } });

    return true;
  }
}
