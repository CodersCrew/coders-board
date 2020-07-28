import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { ModelBase } from '../common/ModelBase';
import { Position } from '../positions/position.model';
import { TeamMember } from '../team-members/team-member.model';

@ObjectType()
@Entity()
export class MemberPosition extends ModelBase {
  @Field()
  @Column()
  from: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  to?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field(type => Position)
  @ManyToOne(
    type => Position,
    position => position.users,
  )
  position: Promise<Position>;

  @Column()
  positionId: string;

  @Field(type => TeamMember)
  @ManyToOne(
    type => TeamMember,
    teamMember => teamMember.positions,
  )
  teamMember: Promise<TeamMember>;

  @Column()
  teamMemberId: string;
}
