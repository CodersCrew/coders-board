import { Test, TestingModule } from '@nestjs/testing';
import { SquadsService } from './squads.service';

describe('SquadsService', () => {
  let service: SquadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SquadsService],
    }).compile();

    service = module.get<SquadsService>(SquadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
