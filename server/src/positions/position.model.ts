import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from '../common/models';
import { Clan } from '../guilds/clans/clan.model';
import { Guild } from '../guilds/guild.model';

export enum PositionScope {
  ORGANIZATION = 'ORGANIZATION',
  GUILD = 'GUILD',
  SQUAD = 'SQUAD',
}

registerEnumType(PositionScope, {
  name: 'PositionScope',
});

@ObjectType()
@Entity()
export class Position extends BaseModel {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: '', type: 'text' })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field(type => [PositionScope])
  @Column({ type: 'enum', array: true, enum: PositionScope })
  scopes: PositionScope[];

  @Field(type => Clan, { nullable: true })
  @ManyToOne(type => Clan, { nullable: true })
  clan?: Clan;

  @Field({ nullable: true })
  @Column({ nullable: true })
  clanId?: string;

  @Field(type => Guild, { nullable: true })
  @ManyToOne(type => Guild, { nullable: true })
  guild?: Guild;

  @Field({ nullable: true })
  @Column({ nullable: true })
  guildId?: string;
}
