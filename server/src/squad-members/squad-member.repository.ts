import { EntityRepository, Repository } from 'typeorm';

import { SquadMember } from './squad-member.model';

@EntityRepository(SquadMember)
export class SquadMemberRepository extends Repository<SquadMember> {}
