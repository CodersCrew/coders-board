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

import { Position } from '../positions/position.model';
import { TeamMember } from '../team-members/team-member.model';

export enum TeamKind {
  TASKFORCE = 'TASKFORCE',
  GUILD = 'GUILD',
  CLAN = 'CLAN',
  SQUAD = 'SQUAD',
  CHAPTER = 'CHAPTER',
  MANAGEMENT = 'MANAGEMENT',
}

registerEnumType(TeamKind, {
  name: 'TeamKind',
});

@ObjectType()
@Entity()
export class Team {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  googleId: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: 'https://images.unsplash.com/photo-1584473596888-b37ddb988eee?auto=format&fit=crop&w=600&q=80' })
  image: string;

  @Field()
  @Column({ type: 'text', default: '' })
  description: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ default: '#1890ff' })
  color: string;

  @Field(type => TeamKind)
  @Column({ type: 'enum', enum: TeamKind })
  kind: TeamKind;

  @Field(type => Team, { nullable: true })
  @ManyToOne(
    type => Team,
    team => team.children,
    { nullable: true },
  )
  parent?: Promise<Team>;

  @Column({ nullable: true })
  parentId?: string;

  @Field(type => [Team])
  @OneToMany(
    type => Team,
    team => team.parent,
  )
  children: Promise<Team[]>;

  @Field(type => [Position])
  @OneToMany(
    type => Position,
    position => position.team,
  )
  positions: Promise<Position[]>;

  @Field(type => [TeamMember])
  @OneToMany(
    type => TeamMember,
    teamMamber => teamMamber.team,
  )
  members: Promise<TeamMember[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
