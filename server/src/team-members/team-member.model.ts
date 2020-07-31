import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { ModelBase } from '../common/ModelBase';
import { MemberPosition } from '../member-positions/member-position.model';
import { Team } from '../teams/team.model';
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
export class TeamMember extends ModelBase {
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

  @Field(type => [MemberPosition])
  @OneToMany(
    type => MemberPosition,
    userPosition => userPosition.teamMember,
  )
  positions: Promise<MemberPosition[]>;
}
