import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { ModelBase } from '../common/ModelBase';
import { MemberPosition } from '../member-positions/member-position.model';
import { Team } from '../teams/team.model';

@ObjectType()
@Entity()
export class Position extends ModelBase {
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

  @Field(type => [MemberPosition])
  @OneToMany(
    type => MemberPosition,
    memberPosition => memberPosition.position,
  )
  users: Promise<MemberPosition[]>;
}
