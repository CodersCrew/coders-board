import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { Clan } from '../clans/clan.model';
import { BaseModel } from '../common/models/Base.model';
import { Guild } from '../guilds/guild.model';

@ObjectType()
export class Area {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image: string;
}

@ObjectType()
@Entity()
export class Position extends BaseModel {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: '' })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string;

  @ManyToOne(type => Clan, { nullable: true })
  clan?: Promise<Clan>;

  @Column({ nullable: true })
  clanId?: string;

  @ManyToOne(type => Guild, { nullable: true })
  guild?: Promise<Guild>;

  @Column({ nullable: true })
  guildId?: string;

  @Field(type => Area, { nullable: true })
  area?: Area;
}
