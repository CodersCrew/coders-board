import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';

import { GsuiteService } from './gsuite.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [GsuiteService],
  exports: [GsuiteService],
})
export class GsuiteModule {}
