import { Test, TestingModule } from '@nestjs/testing';
import { SquadPositionsResolver } from './squad-positions.resolver';

describe('SquadPositionsResolver', () => {
  let resolver: SquadPositionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SquadPositionsResolver],
    }).compile();

    resolver = module.get<SquadPositionsResolver>(SquadPositionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
