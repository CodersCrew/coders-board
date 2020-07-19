import { Field, ID, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
@Entity()
export class Position {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: '' })
  description: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(type => Team, { nullable: true })
  @ManyToOne(
    type => Team,
    team => team.positions,
    { nullable: true },
  )
  team: Promise<Team>;

  @Column({ nullable: true })
  teamId: string;

  @Field(type => [UserPosition])
  @OneToMany(
    type => UserPosition,
    userPosition => userPosition.position,
  )
  users: Promise<UserPosition[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
