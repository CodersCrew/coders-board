import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from '../common/models/Base.model';
import { GuildMember } from '../guild-members/guild-member.model';
import { SquadMember } from '../squad-members/squad-member.model';

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
  fullName: string;

  @Field()
  @Column({ unique: true })
  primaryEmail: string;

  @Field()
  @Column({ default: '' })
  recoveryEmail: string;

  @Field()
  @Column({ nullable: true })
  phone?: string;

  @Field()
  @Column()
  image: string;

  @Field()
  @Column({ unique: true })
  googleId: string;

  @Field(type => UserStatus)
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @Field(type => UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Field(type => [GuildMember])
  @OneToMany(
    type => GuildMember,
    guildMember => guildMember.user,
  )
  guilds: Promise<GuildMember[]>;

  @Field(type => [SquadMember])
  @OneToMany(
    type => SquadMember,
    squadMember => squadMember.user,
  )
  squads: Promise<SquadMember[]>;
}
