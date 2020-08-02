import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

import { MemberPosition } from '../member-position.model';

@InputType()
export class UpdateMemberPositionInput implements Partial<MemberPosition> {
  @Field(type => ID)
  @IsOptional()
  @IsUUID()
  id?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  teamMemberId?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  positionId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  from?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  to?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
