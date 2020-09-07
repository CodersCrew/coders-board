import { EntityRepository, Repository } from 'typeorm';

import { Success } from './success.model';

@EntityRepository(Success)
export class SuccessRepository extends Repository<Success> {}
