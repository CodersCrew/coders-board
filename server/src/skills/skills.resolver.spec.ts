import { Test, TestingModule } from '@nestjs/testing';

import { SkillsResolver } from './skills.resolver';

describe('SkillsResolver', () => {
  let resolver: SkillsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillsResolver],
    }).compile();

    resolver = module.get<SkillsResolver>(SkillsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
