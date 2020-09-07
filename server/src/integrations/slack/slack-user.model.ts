import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SlackUser {
  constructor(data: SlackUser) {
    Object.assign(this, data);
  }

  @Field()
  id: string;

  @Field()
  fullName: string;

  @Field()
  primaryEmail: string;

  @Field()
  image: string;

  @Field()
  thumbnail: string;
}
