import { Test, TestingModule } from '@nestjs/testing';

import { ClansResolver } from './clans.resolver';

describe('ClansResolver', () => {
  let resolver: ClansResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClansResolver],
    }).compile();

    resolver = module.get<ClansResolver>(ClansResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
