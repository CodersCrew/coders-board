import { Test, TestingModule } from '@nestjs/testing';
import { ClansService } from './clans.service';

describe('ClansService', () => {
  let service: ClansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClansService],
    }).compile();

    service = module.get<ClansService>(ClansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
