import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { ModelBase } from '../common/ModelBase';
import { MemberPosition } from '../member-positions/member-position.model';
import { TeamMember } from '../team-members/team-member.model';

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
export class User extends ModelBase {
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

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

  @Field(type => [TeamMember])
  @OneToMany(
    type => TeamMember,
    teamMamber => teamMamber.user,
  )
  teams: TeamMember[];

  @Field(type => [MemberPosition])
  positions: MemberPosition[];
}
