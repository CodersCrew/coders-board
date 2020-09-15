import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from '../../common/models';
import { Position } from '../../positions/position.model';
import { Clan } from '../clans/clan.model';
import { GuildMember } from '../guild-members/guild-member.model';

@ObjectType()
@Entity()
export class GuildPosition extends BaseModel {
  @Field()
  @Column()
  from: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  to?: Date;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Field(type => Position)
  @ManyToOne(type => Position)
  position: Position;

  @Field()
  @Column()
  positionId: string;

  @Field(type => GuildMember)
  @ManyToOne(type => GuildMember, guildMember => guildMember.positions)
  member: GuildMember;

  @Field()
  @Column()
  memberId: string;

  @Field(type => Clan, { nullable: true })
  @ManyToOne(type => Clan, clan => clan.positions, { nullable: true })
  clan?: Clan;

  @Field()
  @Column({ nullable: true })
  clanId?: string;
}
