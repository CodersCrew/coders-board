import { Field, ID, InputType } from '@nestjs/graphql';
import { Contains, IsEmail, IsEnum, IsHexColor, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { Team, TeamKind } from '../team.model';

@InputType()
export class CreateTeamInput implements Partial<Team> {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(type => TeamKind)
  @IsEnum(TeamKind)
  kind: TeamKind;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsHexColor()
  @Contains('#')
  color?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
