import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Position } from '../positions/position.model';
import { TeamMember } from '../team-members/team-member.model';
import { User } from '../users/user.model';

@ObjectType()
@Entity()
export class UserPosition {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  from: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  to?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.positions,
  )
  user: User;

  @Column()
  userId: string;

  @Field(type => Position)
  @ManyToOne(
    type => Position,
    position => position.users,
  )
  position: Position;

  @Column()
  positionId: string;

  @Field(type => TeamMember)
  @ManyToOne(
    type => TeamMember,
    teamMember => teamMember.positions,
  )
  teamMember: TeamMember;

  @Column()
  teamMemberId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
