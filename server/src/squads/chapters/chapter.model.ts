import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { TeamModel } from '../../common/models/Team.model';
import { SquadPosition } from '../squad-positions/squad-position.model';
import { Squad } from '../squad.model';

@ObjectType()
@Entity()
export class Chapter extends TeamModel {
  @Field(type => Squad)
  @ManyToOne(type => Squad, squad => squad.chapters)
  squad: Promise<Squad>;

  @Field()
  @Column()
  squadId: string;

  @Field(type => [SquadPosition])
  @OneToMany(type => SquadPosition, squadPosition => squadPosition.chapter)
  positions: Promise<SquadPosition[]>;
}
