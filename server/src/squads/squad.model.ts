import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { TeamModel } from '../common/models';
import { Chapter } from './chapters/chapter.model';
import { SquadMember } from './squad-members/squad-member.model';

@ObjectType()
@Entity()
export class Squad extends TeamModel {
  @Column()
  @Field()
  color: string;

  @Column()
  @Field()
  image: string;

  @Field(type => [SquadMember])
  @OneToMany(type => SquadMember, squadMember => squadMember.squad)
  members: SquadMember[];

  @Field(type => [Chapter])
  @OneToMany(type => Chapter, chapter => chapter.squad)
  chapters: Chapter[];
}
