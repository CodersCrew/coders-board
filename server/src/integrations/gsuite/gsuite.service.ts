import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { admin_directory_v1, google } from 'googleapis';
import fetch from 'node-fetch';

import { env } from '../../common/env';
import { pick, transformAndValidate } from '../../common/utils';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserImageInput } from './dto/update-user-image.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GsuiteUser } from './gsuite-user.model';
import { CreateGroupParams } from './interfaces/create-group.params';
import { CreateMemberParams } from './interfaces/create-member.params';
import { DeleteGroupParams } from './interfaces/delete-group.params';
import { DeleteMemberParams } from './interfaces/delete-member.params';
import { DeleteUserParams } from './interfaces/delete-user.params';
import { HasMemberParams } from './interfaces/has-member.params';
import { UpdateGroupParams } from './interfaces/update-group.params';
import { UpdateMemberParams } from './interfaces/update-member.params';

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
  constructor() {
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

  async findAllUsers() {
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

  async createUser(input: CreateUserInput) {
    const googleUserInput = await transformAndValidate(CreateUserInput, input);
    const password = createHash('md5').update(googleUserInput.password).digest('hex');

    const response = await this.admin.users.insert({
      requestBody: {
        name: {
          familyName: googleUserInput.firstName,
          givenName: googleUserInput.lastName,
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

  async updateUser(input: UpdateUserInput): Promise<boolean> {
    const { id, ...googleUserInput } = await transformAndValidate(UpdateUserInput, input);

    await this.admin.users.update({ userKey: id, requestBody: googleUserInput });

    return true;
  }

  async deleteUser({ id }: DeleteUserParams): Promise<boolean> {
    await this.admin.users.delete({ userKey: id });

    return true;
  }

  async updateUserImage(input: UpdateUserImageInput): Promise<boolean> {
    const { id, imageUrl } = await transformAndValidate(UpdateUserImageInput, input);
    const photoData = await imageToBase64(imageUrl);

    await this.admin.users.photos.update({ userKey: id, requestBody: { photoData } });

    return true;
  }

  async createGroup(input: CreateGroupParams): Promise<string> {
    const response = await this.admin.groups.insert({
      requestBody: {
        name: input.name,
        description: input.description,
        email: input.email,
      },
    });

    return response.data.id;
  }

  async updateGroup({ id, ...input }: UpdateGroupParams): Promise<boolean> {
    await this.admin.groups.update({
      groupKey: id,
      requestBody: {
        name: input.name,
        description: input.description,
        email: input.email,
      },
    });

    return true;
  }

  async deleteGroup({ id }: DeleteGroupParams): Promise<boolean> {
    await this.admin.groups.delete({ groupKey: id });

    return true;
  }

  async hasMember({ groupId, userId }: HasMemberParams): Promise<boolean> {
    const { data } = await this.admin.members.hasMember({ groupKey: groupId, memberKey: userId });

    return data.isMember;
  }

  async createMember({ groupId, userId, role }: CreateMemberParams): Promise<boolean> {
    await this.admin.members.insert({
      groupKey: groupId,
      requestBody: { id: userId, role },
    });

    return true;
  }

  async updateMember({ groupId, userId, role }: UpdateMemberParams): Promise<boolean> {
    await this.admin.members.update({
      groupKey: groupId,
      memberKey: userId,
      requestBody: { role },
    });

    return true;
  }

  async deleteMember({ groupId, userId }: DeleteMemberParams): Promise<boolean> {
    await this.admin.members.delete({ groupKey: groupId, memberKey: userId });

    return true;
  }
}
