import { Module } from '@nestjs/common';

import { GsuiteResolver } from './gsuite.resolver';
import { GsuiteService } from './gsuite.service';

@Module({
  providers: [GsuiteService, GsuiteResolver],
  exports: [GsuiteService],
})
export class GsuiteModule {}
