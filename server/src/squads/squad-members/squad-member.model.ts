import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { TeamRole } from '../../common/enums/team-role.enum';
import { BaseModel } from '../../common/models/Base.model';
import { User } from '../../users/user.model';
import { SquadPosition } from '../squad-positions/squad-position.model';
import { Squad } from '../squad.model';

@ObjectType()
@Entity()
export class SquadMember extends BaseModel {
  @Field(type => TeamRole)
  @Column({ type: 'enum', enum: TeamRole, default: TeamRole.MEMBER })
  role: TeamRole;

  @Field(type => [SquadPosition])
  @OneToMany(
    type => SquadPosition,
    squadPosition => squadPosition.member,
  )
  positions: Promise<SquadPosition[]>;

  @Field(type => Squad)
  @ManyToOne(
    type => Squad,
    squad => squad.members,
  )
  squad: Promise<Squad>;

  @Column()
  squadId: string;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.squads,
  )
  user: Promise<User>;

  @Column()
  userId: string;
}
