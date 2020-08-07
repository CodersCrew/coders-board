import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { SquadPosition } from '../squad-position.model';

@InputType()
export class UpdateSquadPositionInput implements Partial<SquadPosition> {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

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

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  squadId: string;
}
