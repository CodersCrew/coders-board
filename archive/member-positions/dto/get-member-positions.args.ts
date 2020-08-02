import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class GetMemberPositionsArgs {
  @Field({ defaultValue: true })
  @IsOptional()
  @IsBoolean()
  teamMemberId: string;
}
