import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserPosition } from './user-position.model';
import { UserPositionRepository } from './user-position.repository';
import { UserPositionsResolver } from './user-positions.resolver';
import { UserPositionsService } from './user-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserPosition, UserPositionRepository])],
  providers: [UserPositionsService, UserPositionsResolver],
})
export class UserPositionsModule {}
