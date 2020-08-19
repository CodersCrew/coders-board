import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from '../common/models';
import { Clan } from '../guilds/clans/clan.model';
import { Guild } from '../guilds/guild.model';

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

  @Field(type => Clan, { nullable: true })
  @ManyToOne(type => Clan, { nullable: true })
  clan?: Promise<Clan>;

  @Field()
  @Column({ nullable: true })
  clanId?: string;

  @Field(type => Guild, { nullable: true })
  @ManyToOne(type => Guild, { nullable: true })
  guild?: Promise<Guild>;

  @Field()
  @Column({ nullable: true })
  guildId?: string;
}
