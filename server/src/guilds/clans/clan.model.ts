import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { TeamModel } from '../../common/models/Team.model';
import { GuildPosition } from '../guild-positions/guild-position.model';
import { Guild } from '../guild.model';

@ObjectType()
@Entity()
export class Clan extends TeamModel {
  @Field()
  @Column()
  image: string;

  @Field(type => Guild)
  @ManyToOne(
    type => Guild,
    guild => guild.clans,
  )
  guild: Promise<Guild>;

  @Column()
  guildId: string;

  @Field(type => [GuildPosition])
  @OneToMany(
    type => GuildPosition,
    guildPosition => guildPosition.clan,
  )
  positions: Promise<GuildPosition[]>;
}
