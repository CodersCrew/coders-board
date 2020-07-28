import { Test, TestingModule } from '@nestjs/testing';

import { MemberPositionsResolver } from './member-positions.resolver';

describe('MemberPositionsResolver', () => {
  let resolver: MemberPositionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberPositionsResolver],
    }).compile();

    resolver = module.get<MemberPositionsResolver>(MemberPositionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
