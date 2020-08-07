import { Test, TestingModule } from '@nestjs/testing';
import { GuildPositionsResolver } from './guild-positions.resolver';

describe('GuildPositionsResolver', () => {
  let resolver: GuildPositionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildPositionsResolver],
    }).compile();

    resolver = module.get<GuildPositionsResolver>(GuildPositionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
