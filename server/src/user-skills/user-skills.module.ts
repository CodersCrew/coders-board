import { Module } from '@nestjs/common';

import { UserSkillsResolver } from './user-skills.resolver';
import { UserSkillsService } from './user-skills.service';

@Module({
  providers: [UserSkillsService, UserSkillsResolver],
})
export class UserSkillsModule {}
