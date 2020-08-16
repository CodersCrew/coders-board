import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { admin_directory_v1, google } from 'googleapis';
import fetch from 'node-fetch';

import { env } from '../../common/env';
import { UserRole, UserStatus } from '../../users/user.model';
import { CreateGroupParams } from './interfaces/create-group.params';
import { CreateMemberParams } from './interfaces/create-member.params';
import { CreateUserParams } from './interfaces/create-user.params';
import { DeleteGroupParams } from './interfaces/delete-group.params';
import { DeleteMemberParams } from './interfaces/delete-member.params';
import { DeleteUserParams } from './interfaces/delete-user.params';
import { HasMemberParams } from './interfaces/has-member.params';
import { UpdateGroupParams } from './interfaces/update-group.params';
import { UpdateMemberParams } from './interfaces/update-member.params';
import { UpdateUserImageParams } from './interfaces/update-user-image.params';
import { UpdateUserParams } from './interfaces/update-user.params';

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

  async initialize() {
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
      .map(user => ({
        firstName: user.name.givenName,
        lastName: user.name.familyName,
        googleId: user.id,
        image: user.thumbnailPhotoUrl,
        primaryEmail: user.primaryEmail,
        recoveryEmail: user.recoveryEmail,
        role: user.isAdmin ? UserRole.ADMIN : UserRole.USER,
        status: UserStatus.ACTIVE,
      }));
  }

  async createUser(input: CreateUserParams): Promise<string> {
    const password = createHash('md5').update(input.password).digest('hex');

    const response = await this.admin.users.insert({
      requestBody: {
        name: {
          familyName: input.firstName,
          givenName: input.lastName,
          fullName: `${input.firstName} ${input.lastName}`,
        },
        primaryEmail: input.primaryEmail,
        recoveryEmail: input.recoveryEmail,
        password,
        changePasswordAtNextLogin: true,
        hashFunction: 'MD5',
      },
    });

    return response.data.id;
  }

  async updateUser({ id, ...input }: UpdateUserParams): Promise<boolean> {
    await this.admin.users.update({ userKey: id, requestBody: input });

    return true;
  }

  async deleteUser({ id }: DeleteUserParams): Promise<boolean> {
    await this.admin.users.delete({ userKey: id });

    return true;
  }

  async updateUserImage({ id, imageUrl }: UpdateUserImageParams): Promise<boolean> {
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
