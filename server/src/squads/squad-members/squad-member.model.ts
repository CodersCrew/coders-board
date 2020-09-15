import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { TeamRole } from '../../common/enums';
import { BaseModel } from '../../common/models';
import { User } from '../../users/user.model';
import { SquadPosition } from '../squad-positions/squad-position.model';
import { Squad } from '../squad.model';

@ObjectType()
@Entity()
@Index('squad_user_ids', ({ squadId, userId }: SquadMember) => [squadId, userId], { unique: true })
export class SquadMember extends BaseModel {
  @Field(type => TeamRole)
  @Column({ type: 'enum', enum: TeamRole, default: TeamRole.MEMBER })
  role: TeamRole;

  @Field(type => [SquadPosition])
  @OneToMany(type => SquadPosition, squadPosition => squadPosition.member, { cascade: true })
  positions: SquadPosition[];

  @Field(type => Squad)
  @ManyToOne(type => Squad, squad => squad.members, { eager: true })
  squad: Squad;

  @Field()
  @Column()
  squadId: string;

  @Field(type => User)
  @ManyToOne(type => User, user => user.squads, { eager: true })
  user: User;

  @Field()
  @Column()
  userId: string;
}
