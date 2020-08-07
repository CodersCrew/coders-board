import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from '../../common/models/Base.model';
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
  @Column({ nullable: true })
  notes?: string;

  @Field(type => SquadMember)
  @ManyToOne(
    type => SquadMember,
    squadMember => squadMember.positions,
  )
  member: Promise<SquadMember>;

  @Column()
  memberId: string;

  @Field(type => Chapter, { nullable: true })
  @ManyToOne(
    type => Chapter,
    chapter => chapter.positions,
    { nullable: true },
  )
  chapter?: Promise<Chapter>;

  @Column({ nullable: true })
  chapterId?: string;

  @Field(type => Position)
  @ManyToOne(type => Position)
  position: Promise<Position>;

  @Column()
  positionId: string;
}
