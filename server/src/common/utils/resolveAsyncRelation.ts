import { Repository } from 'typeorm';

import { BaseModel } from '../models';

export function resolveAsyncRelation<T extends BaseModel, K extends keyof T>(repository: Repository<T>, relation: K) {
  return async (entity: T) => {
    const record = await repository.findOne(entity.id, { relations: [relation as string], withDeleted: true });
    return record[relation];
  };
}
