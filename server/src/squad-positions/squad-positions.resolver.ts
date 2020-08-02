import { Resolver } from '@nestjs/graphql';

import { SquadPosition } from './squad-position.model';

@Resolver(of => SquadPosition)
export class SquadPositionsResolver {}
