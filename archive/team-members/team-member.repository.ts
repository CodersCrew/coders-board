import { EntityRepository, Repository } from 'typeorm';

import { TeamMember } from './team-member.model';

@EntityRepository(TeamMember)
export class TeamMemberRepository extends Repository<TeamMember> {}
