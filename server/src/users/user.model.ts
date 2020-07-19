import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TeamMember } from '../team-members/team-member.model';
import { UserPosition } from '../user-positions/user-position.model';

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
});

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Field(type => [UserPosition])
  @OneToMany(
    type => UserPosition,
    userPosition => userPosition.user,
  )
  positions: UserPosition[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
