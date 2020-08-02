import { Resolver } from '@nestjs/graphql';

import { GuildMember } from './guild-member.model';

@Resolver(of => GuildMember)
export class GuildMembersResolver {}
