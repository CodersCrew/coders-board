import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';

import { GsuiteResolver } from './gsuite.resolver';
import { GsuiteService } from './gsuite.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [GsuiteService, GsuiteResolver],
  exports: [GsuiteService],
})
export class GsuiteModule {}
