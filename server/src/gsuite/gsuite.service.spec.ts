import { Test, TestingModule } from '@nestjs/testing';

import { GsuiteService } from './gsuite.service';

describe('GsuiteService', () => {
  let service: GsuiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GsuiteService],
    }).compile();

    service = module.get<GsuiteService>(GsuiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
