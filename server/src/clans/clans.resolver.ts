import { Resolver } from '@nestjs/graphql';

import { Clan } from './clan.model';

@Resolver(of => Clan)
export class ClansResolver {}
