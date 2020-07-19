import { Module } from '@nestjs/common';

import { SkillsResolver } from './skills.resolver';
import { SkillsService } from './skills.service';

@Module({
  providers: [SkillsService, SkillsResolver],
})
export class SkillsModule {}
