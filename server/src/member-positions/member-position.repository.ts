import { EntityRepository, Repository } from 'typeorm';

import { MemberPosition } from './member-position.model';

@EntityRepository(MemberPosition)
export class MemberPositionRepository extends Repository<MemberPosition> {}
