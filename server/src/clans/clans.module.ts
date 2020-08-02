import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Clan } from './clan.model';
import { ClanRepository } from './clan.repository';
import { ClansResolver } from './clans.resolver';
import { ClansService } from './clans.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clan, ClanRepository])],
  providers: [ClansService, ClansResolver],
})
export class ClansModule {}
