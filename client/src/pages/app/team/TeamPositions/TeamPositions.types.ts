import { ComponentProps } from 'react';

// import { MemberPosition } from '@/typings/graphql';
import { TeamPositionModal } from './TeamPositionModal';

export type TeamPositionModalState = ComponentProps<typeof TeamPositionModal>['data'];

// export type PositionItem = Pick<MemberPosition, 'id' | 'from' | 'to' | 'notes'> & {
//   positionName: string;
//   positionId: string;
//   userName: string;
//   userImage: string;
//   teamMemberId: string;
// };

export type PositionItem = any;
