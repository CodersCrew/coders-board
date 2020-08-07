import { Test, TestingModule } from '@nestjs/testing';
import { ChaptersResolver } from './chapters.resolver';

describe('ChaptersResolver', () => {
  let resolver: ChaptersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChaptersResolver],
    }).compile();

    resolver = module.get<ChaptersResolver>(ChaptersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
