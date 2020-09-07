import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { BaseModel } from '../common/models';
import { User } from '../users/user.model';

export enum SuccessType {
  EPIC = 'EPIC',
  SMALL = 'SMALL',
  NEWS = 'NEWS',
}

registerEnumType(SuccessType, {
  name: 'SuccessType',
});

@ObjectType()
@Entity()
export class Success extends BaseModel {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field()
  @Column()
  date: Date;

  @Field(type => SuccessType)
  @Column({ type: 'enum', enum: SuccessType })
  type: SuccessType;

  @Field(type => [User])
  @ManyToMany(type => User, user => user.successes)
  @JoinTable()
  users: User[];

  @Field(type => User)
  @ManyToOne(type => User)
  creator: User;

  @Field()
  @Column()
  creatorId: string;
}
