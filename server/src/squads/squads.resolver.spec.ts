import { Test, TestingModule } from '@nestjs/testing';
import { SquadsResolver } from './squads.resolver';

describe('SquadsResolver', () => {
  let resolver: SquadsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SquadsResolver],
    }).compile();

    resolver = module.get<SquadsResolver>(SquadsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
