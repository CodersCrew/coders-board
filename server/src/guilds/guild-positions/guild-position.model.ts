import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from '../../common/models/Base.model';
import { Clan } from '../clans/clan.model';
import { GuildMember } from '../guild-members/guild-member.model';

export enum GuildPositionKind {
  MEMBER = 'MEMBER',
  LEADER = 'LEADER',
  EXPERT = 'EXPERT',
}
registerEnumType(GuildPositionKind, {
  name: 'GuildPositionKind',
});

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

  @Field(type => GuildPositionKind)
  @Column({ type: 'enum', enum: GuildPositionKind, default: GuildPositionKind.MEMBER })
  kind: GuildPositionKind;

  @Field(type => GuildMember)
  @ManyToOne(
    type => GuildMember,
    guildMember => guildMember.positions,
  )
  member: Promise<GuildMember>;

  @Column()
  memberId: string;

  @Field(type => Clan, { nullable: true })
  @ManyToOne(
    type => Clan,
    clan => clan.positions,
    { nullable: true },
  )
  clan?: Promise<Clan>;

  @Column({ nullable: true })
  clanId?: string;
}
