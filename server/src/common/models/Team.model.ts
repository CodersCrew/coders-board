import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { BaseModel } from './Base.model';

@ObjectType()
@Entity()
export class TeamModel extends BaseModel {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'text' })
  description: string;
}
