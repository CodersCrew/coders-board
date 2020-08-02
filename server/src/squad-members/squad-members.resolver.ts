import { Resolver } from '@nestjs/graphql';

import { SquadMember } from './squad-member.model';

@Resolver(of => SquadMember)
export class SquadMembersResolver {}
