import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { TeamModel } from '../../common/models';
import { GuildPosition } from '../guild-positions/guild-position.model';
import { Guild } from '../guild.model';

@ObjectType()
@Entity()
export class Clan extends TeamModel {
  @Field()
  @Column()
  image: string;

  @Field(type => Guild)
  @ManyToOne(type => Guild, guild => guild.clans)
  guild: Guild;

  @Field()
  @Column()
  guildId: string;

  @Field(type => [GuildPosition])
  @OneToMany(type => GuildPosition, guildPosition => guildPosition.clan)
  positions: GuildPosition[];
}
