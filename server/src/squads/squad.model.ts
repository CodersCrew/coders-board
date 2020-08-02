import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { Chapter } from '../chapters/chapter.model';
import { TeamModel } from '../common/models/Team.model';
import { SquadMember } from '../squad-members/squad-member.model';

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
  @OneToMany(
    type => SquadMember,
    squadMember => squadMember.squad,
  )
  members: Promise<SquadMember[]>;

  @Field(type => [Chapter])
  @OneToMany(
    type => Chapter,
    chapter => chapter.squad,
  )
  chapters: Promise<Chapter[]>;
}
