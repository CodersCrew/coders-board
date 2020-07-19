import { Test, TestingModule } from '@nestjs/testing';

import { UserSkillsService } from './user-skills.service';

describe('UserSkillsService', () => {
  let service: UserSkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSkillsService],
    }).compile();

    service = module.get<UserSkillsService>(UserSkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
