import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { Position } from '../position.model';

@InputType()
export class UpdatePositionInput implements Partial<Position> {
  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  teamId?: string;
}
