import { Resolver } from '@nestjs/graphql';

import { Guild } from './guild.model';

@Resolver(of => Guild)
export class GuildsResolver {}
