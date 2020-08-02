import { Test, TestingModule } from '@nestjs/testing';
import { SquadMembersService } from './squad-members.service';

describe('SquadMembersService', () => {
  let service: SquadMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SquadMembersService],
    }).compile();

    service = module.get<SquadMembersService>(SquadMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
