import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SuccessRepository } from './success.repository';
import { SuccessesResolver } from './successes.resolver';
import { SuccessesService } from './successes.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuccessRepository])],
  providers: [SuccessesService, SuccessesResolver],
})
export class SuccessesModule {}
