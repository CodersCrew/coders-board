import { Test, TestingModule } from '@nestjs/testing';

import { UserSkillsResolver } from './user-skills.resolver';

describe('UserSkillsResolver', () => {
  let resolver: UserSkillsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSkillsResolver],
    }).compile();

    resolver = module.get<UserSkillsResolver>(UserSkillsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
