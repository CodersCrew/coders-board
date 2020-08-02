import { Test, TestingModule } from '@nestjs/testing';
import { GuildsResolver } from './guilds.resolver';

describe('GuildsResolver', () => {
  let resolver: GuildsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildsResolver],
    }).compile();

    resolver = module.get<GuildsResolver>(GuildsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
