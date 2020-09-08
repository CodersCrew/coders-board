import bcrypt from 'bcryptjs';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';

import { User } from './user.model';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(e: InsertEvent<User>) {
    e.entity.fullName = `${e.entity.firstName} ${e.entity.lastName}`;

    if (e.entity.password) {
      e.entity.password = await bcrypt.hash(e.entity.password, 10);
    }
  }

  async beforeUpdate(e: UpdateEvent<User>) {
    e.entity.fullName = `${e.entity.firstName} ${e.entity.lastName}`;
  }
}
