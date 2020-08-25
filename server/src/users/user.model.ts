import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

import { EMPTY_USER_IMAGE, EMPTY_USER_THUMBNAIL } from '../common/constants';
import { BaseModel } from '../common/models';
import { GuildMember } from '../guilds/guild-members/guild-member.model';
import { SquadMember } from '../squads/squad-members/squad-member.model';
import { Success } from '../successes/success.model';

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
});

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Entity()
export class User extends BaseModel {
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column({ unique: true })
  primaryEmail: string;

  @Field()
  @Column()
  recoveryEmail: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field()
  @Column({ default: EMPTY_USER_IMAGE })
  image: string;

  @Field()
  @Column({ default: EMPTY_USER_THUMBNAIL })
  thumbnail: string;

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  googleId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  slackId?: string;

  @Field(type => UserStatus)
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @Field(type => UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Field(type => [GuildMember])
  @OneToMany(type => GuildMember, guildMember => guildMember.user)
  guilds: GuildMember[];

  @Field(type => [SquadMember])
  @OneToMany(type => SquadMember, squadMember => squadMember.user)
  squads: SquadMember[];

  @Field(type => [Success])
  @ManyToMany(type => Success, success => success.users)
  successes: Success[];

  @Field(type => [Success])
  @OneToMany(type => Success, success => success.creator)
  createdSuccesses: Success[];
}
