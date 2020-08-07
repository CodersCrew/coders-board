import { Test, TestingModule } from '@nestjs/testing';
import { GuildPositionsService } from './guild-positions.service';

describe('GuildPositionsService', () => {
  let service: GuildPositionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildPositionsService],
    }).compile();

    service = module.get<GuildPositionsService>(GuildPositionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
