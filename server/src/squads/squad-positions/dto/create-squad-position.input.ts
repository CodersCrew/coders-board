import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { SquadPosition } from '../squad-position.model';

@InputType()
export class CreateSquadPositionInput implements Partial<SquadPosition> {
  @Field()
  @IsNotEmpty()
  @IsDate()
  from: Date;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  memberId: string;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  positionId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  to?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  chapterId?: string;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  squadId: string;
}
