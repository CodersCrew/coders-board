import { Test, TestingModule } from '@nestjs/testing';
import { SquadMembersResolver } from './squad-members.resolver';

describe('SquadMembersResolver', () => {
  let resolver: SquadMembersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SquadMembersResolver],
    }).compile();

    resolver = module.get<SquadMembersResolver>(SquadMembersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
