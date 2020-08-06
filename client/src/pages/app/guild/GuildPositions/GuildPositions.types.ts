import { ComponentProps } from 'react';

import { GuildPositionModal } from './GuildPositionModal';
import { GuildPositionsQuery } from './GuildPositions.apollo';

export type GuildPositionItem = GuildPositionsQuery['guildPositions'][number];

export type GuildPositionModalState = ComponentProps<typeof GuildPositionModal>['data'];
