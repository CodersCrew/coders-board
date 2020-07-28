import { Test, TestingModule } from '@nestjs/testing';

import { MemberPositionsService } from './member-positions.service';

describe('MemberPositionsService', () => {
  let service: MemberPositionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberPositionsService],
    }).compile();

    service = module.get<MemberPositionsService>(MemberPositionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
