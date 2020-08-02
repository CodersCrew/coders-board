import { Resolver } from '@nestjs/graphql';

import { Squad } from './squad.model';

@Resolver(of => Squad)
export class SquadsResolver {}
