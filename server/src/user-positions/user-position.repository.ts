import { EntityRepository, Repository } from 'typeorm';

import { UserPosition } from './user-position.model';

@EntityRepository(UserPosition)
export class UserPositionRepository extends Repository<UserPosition> {}
