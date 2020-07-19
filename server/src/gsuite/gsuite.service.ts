import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { admin_directory_v1, google } from 'googleapis';
import * as path from 'path';

import { ConfigService } from '../config/config.service';
import { UserRole, UserStatus } from '../users/user.model';
import { CreateGroupParams } from './interfaces/create-group.params';
import { CreateMemberParams } from './interfaces/create-member.params';
import { CreateUserParams } from './interfaces/create-user.params';
import { DeleteMemberParams } from './interfaces/delete-member.params';

@Injectable()
export class GsuiteService {
  constructor(private readonly configService: ConfigService) {
    this.initialize();
  }

  admin: admin_directory_v1.Admin;

  async initialize() {
    const auth = new google.auth.JWT({
      keyFile: path.resolve(__dirname, '../../jwt.keys.json'),
      scopes: [
        'https://www.googleapis.com/auth/admin.directory.user',
        'https://www.googleapis.com/auth/admin.directory.group',
      ],
      subject: this.configService.values.GSUITE_SUBJECT,
    });

    this.admin = google.admin({
      version: 'directory_v1',
      auth,
    });
  }

  async findAllUsers() {
    const response = await this.admin.users.list({
      customer: this.configService.values.GSUITE_CUSTOMER_ID,
      maxResults: 500,
    });

    return response.data.users.map(user => ({
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
    const password = createHash('md5')
      .update(input.password)
      .digest('hex');

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

  async deleteUser(googleId: string): Promise<boolean> {
    await this.admin.users.delete({ userKey: googleId });

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

  async deleteGroup(teamId: string): Promise<boolean> {
    await this.admin.groups.delete({ groupKey: teamId });

    return true;
  }

  async createMember({ googleGroupId, userEmail, role }: CreateMemberParams) {
    const response = await this.admin.members.insert({
      groupKey: googleGroupId,
      requestBody: { email: userEmail, role },
    });

    return response.data.id;
  }

  async deleteMember({ googleGroupId, googleMemberId }: DeleteMemberParams): Promise<boolean> {
    await this.admin.members.delete({ groupKey: googleGroupId, memberKey: googleMemberId });

    return true;
  }
}
