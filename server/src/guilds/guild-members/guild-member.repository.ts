import { EntityRepository, Repository } from 'typeorm';

import { GuildMember } from './guild-member.model';

@EntityRepository(GuildMember)
export class GuildMemberRepository extends Repository<GuildMember> {}
