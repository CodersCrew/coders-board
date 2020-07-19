import { Module } from '@nestjs/common';

import { GsuiteService } from './gsuite.service';

@Module({
  providers: [GsuiteService],
  exports: [GsuiteService],
})
export class GsuiteModule {}
