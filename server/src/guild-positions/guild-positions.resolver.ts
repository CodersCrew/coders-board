import { Resolver } from '@nestjs/graphql';

import { GuildPosition } from './guild-position.model';

@Resolver(of => GuildPosition)
export class GuildPositionsResolver {}
