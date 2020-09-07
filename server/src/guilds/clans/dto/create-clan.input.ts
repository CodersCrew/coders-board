import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

import { Clan } from '../clan.model';

@InputType()
export class CreateClanInput implements Partial<Clan> {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  image: string;

  @Field(type => ID)
  @IsNotEmpty()
  @IsUUID()
  guildId: string;

  @Field({ nullable: true, defaultValue: '' })
  @IsOptional()
  @IsString()
  description: string;
}
