import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from '../../common/models';
import { Position } from '../../positions/position.model';
import { Chapter } from '../chapters/chapter.model';
import { SquadMember } from '../squad-members/squad-member.model';

@ObjectType()
@Entity()
export class SquadPosition extends BaseModel {
  @Field()
  @Column()
  from: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  to?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'text' })
  notes?: string;

  @Field(type => SquadMember)
  @ManyToOne(type => SquadMember, squadMember => squadMember.positions)
  member: SquadMember;

  @Field()
  @Column()
  memberId: string;

  @Field(type => Chapter, { nullable: true })
  @ManyToOne(type => Chapter, chapter => chapter.positions, { nullable: true })
  chapter?: Chapter;

  @Field()
  @Column({ nullable: true })
  chapterId?: string;

  @Field(type => Position)
  @ManyToOne(type => Position)
  position: Position;

  @Field()
  @Column()
  positionId: string;
}
