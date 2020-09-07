import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GsuiteUser {
  constructor(data: GsuiteUser) {
    Object.assign(this, data);
  }

  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  primaryEmail: string;

  @Field({ nullable: true })
  recoveryEmail?: string;
}
