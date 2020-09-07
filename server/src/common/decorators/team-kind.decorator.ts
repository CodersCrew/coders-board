import { SetMetadata } from '@nestjs/common';

export const TeamKind = (kind: 'squad' | 'guild') => SetMetadata('teamKind', kind);
