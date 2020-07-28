import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { MemberPosition } from '../member-position.model';

@InputType()
export class CreateMemberPositionInput implements Partial<MemberPosition> {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  teamMemberId: string;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  positionId: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  from: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  to?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
