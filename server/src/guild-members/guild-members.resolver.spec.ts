import { Test, TestingModule } from '@nestjs/testing';
import { GuildMembersResolver } from './guild-members.resolver';

describe('GuildMembersResolver', () => {
  let resolver: GuildMembersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildMembersResolver],
    }).compile();

    resolver = module.get<GuildMembersResolver>(GuildMembersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
