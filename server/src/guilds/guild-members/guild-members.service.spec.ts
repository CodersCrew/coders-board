import { Test, TestingModule } from '@nestjs/testing';
import { GuildMembersService } from './guild-members.service';

describe('GuildMembersService', () => {
  let service: GuildMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildMembersService],
    }).compile();

    service = module.get<GuildMembersService>(GuildMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
