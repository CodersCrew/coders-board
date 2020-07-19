import { Test, TestingModule } from '@nestjs/testing';

import { UserPositionsService } from './user-positions.service';

describe('UserPositionsService', () => {
  let service: UserPositionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPositionsService],
    }).compile();

    service = module.get<UserPositionsService>(UserPositionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
