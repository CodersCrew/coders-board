import { Field, ObjectType } from '@nestjs/graphql';
import { GuildMember } from 'src/guild-members/guild-member.model';
import { Column, Entity, OneToMany } from 'typeorm';

import { Clan } from '../clans/clan.model';
import { TeamModel } from '../common/models/Team.model';

@ObjectType()
@Entity()
export class Guild extends TeamModel {
  @Column()
  @Field()
  color: string;

  @Column()
  @Field()
  image: string;

  @Field(type => [Clan])
  @OneToMany(
    type => Clan,
    clan => clan.guild,
  )
  clans: Promise<Clan[]>;

  @Field(type => [GuildMember])
  @OneToMany(
    type => GuildMember,
    member => member.guild,
  )
  members: Promise<GuildMember[]>;
}
