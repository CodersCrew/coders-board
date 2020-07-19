import { Test, TestingModule } from '@nestjs/testing';

import { TeamMembersResolver } from './team-members.resolver';

describe('TeamMembersResolver', () => {
  let resolver: TeamMembersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamMembersResolver],
    }).compile();

    resolver = module.get<TeamMembersResolver>(TeamMembersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
