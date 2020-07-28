import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberPosition } from './member-position.model';
import { MemberPositionRepository } from './member-position.repository';
import { MemberPositionsResolver } from './member-positions.resolver';
import { MemberPositionsService } from './member-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([MemberPosition, MemberPositionRepository])],
  providers: [MemberPositionsService, MemberPositionsResolver],
})
export class MemberPositionsModule {}
