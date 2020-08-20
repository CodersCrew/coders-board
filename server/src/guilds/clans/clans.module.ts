import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IntegrationsModule } from '../../integrations/integrations.module';
import { ClanRepository } from './clan.repository';
import { ClansResolver } from './clans.resolver';
import { ClansService } from './clans.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClanRepository]), IntegrationsModule],
  providers: [ClansService, ClansResolver],
})
export class ClansModule {}
