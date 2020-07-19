import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Team } from '../teams/team.model';
import { UserPosition } from '../user-positions/user-position.model';
import { User } from '../users/user.model';

export enum TeamRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  MEMBER = 'MEMBER',
}

registerEnumType(TeamRole, {
  name: 'TeamRole',
});

@ObjectType()
@Entity()
export class TeamMember {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  googleId: string;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.teams,
  )
  user: Promise<User>;

  @Column()
  userId: string;

  @Field(type => Team)
  @ManyToOne(
    type => Team,
    team => team.members,
  )
  team: Promise<Team>;

  @Column()
  teamId: string;

  @Field(type => TeamRole)
  @Column({ type: 'enum', enum: TeamRole, default: TeamRole.MEMBER })
  role: TeamRole;

  @Field(type => [UserPosition])
  @OneToMany(
    type => UserPosition,
    userPosition => userPosition.teamMember,
  )
  positions: Promise<UserPosition[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
