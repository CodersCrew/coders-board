import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@ArgsType()
export class GetGuildPositionsArgs {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  guildId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  memberId?: string;
}
