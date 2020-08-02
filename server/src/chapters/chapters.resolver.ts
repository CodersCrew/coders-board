import { Resolver } from '@nestjs/graphql';

import { Chapter } from './chapter.model';

@Resolver(of => Chapter)
export class ChaptersResolver {}
