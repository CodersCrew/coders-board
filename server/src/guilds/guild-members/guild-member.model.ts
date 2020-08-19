import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { TeamRole } from '../../common/enums';
import { BaseModel } from '../../common/models';
import { User } from '../../users/user.model';
import { GuildPosition } from '../guild-positions/guild-position.model';
import { Guild } from '../guild.model';

@ObjectType()
@Entity()
@Index('guild_user_ids', ({ guildId, userId }: GuildMember) => [guildId, userId], { unique: true })
export class GuildMember extends BaseModel {
  @Field(type => TeamRole)
  @Column({ type: 'enum', enum: TeamRole, default: TeamRole.MEMBER })
  role: TeamRole;

  @Field(type => User)
  @ManyToOne(type => User, user => user.guilds)
  user: Promise<User>;

  @Field()
  @Column()
  userId: string;

  @Field(type => Guild)
  @ManyToOne(type => Guild, guild => guild.members)
  guild: Promise<Guild>;

  @Field()
  @Column()
  guildId: string;

  @Field(type => [GuildPosition])
  @OneToMany(type => GuildPosition, guildPosition => guildPosition.member)
  positions: Promise<GuildPosition[]>;
}
