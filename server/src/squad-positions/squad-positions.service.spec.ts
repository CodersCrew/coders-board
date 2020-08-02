import { Test, TestingModule } from '@nestjs/testing';
import { SquadPositionsService } from './squad-positions.service';

describe('SquadPositionsService', () => {
  let service: SquadPositionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SquadPositionsService],
    }).compile();

    service = module.get<SquadPositionsService>(SquadPositionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
