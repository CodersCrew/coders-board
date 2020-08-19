import React from 'react';
import { Avatar, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { Box, Paragraph } from '@/components/atoms';
import { UseSquadMembers } from '@/graphql/squads';
import { TeamRole } from '@/typings/graphql';

import { SquadMemberModalProps } from './SquadMemberModal';

type Member = UseSquadMembers['item'];
type Columns = ColumnsType<Member>;

type Params = {
  openModal: (data: SquadMemberModalProps['data']) => void;
};

export const useSquadMembersColumns = () => {
  const columns: Columns = [
    {
      title: 'Full name',
      key: 'fullname',
      width: 216,
      fixed: true,
      render: (_, { user: { fullName, image } }) => (
        <Box px={4} display="flex" alignItems="center">
          <Avatar size="small" src={image} />
          <Paragraph ml={12}>{fullName}</Paragraph>
        </Box>
      ),
    },
    {
      title: 'Role',
      key: 'role',
      render: (_, { role }) => {
        if (role === TeamRole.Owner) return <Tag color="geekblue">Owner</Tag>;
        if (role === TeamRole.Manager) return <Tag color="blue">Manager</Tag>;

        return <Tag color="cyan">Member</Tag>;
      },
    },
    {
      title: 'Position',
      key: 'position',
      render: (_, { positions }) => (
        <Paragraph whiteSpace="pre-line">
          {positions
            .map(({ chapter, position: { name: positionName } }) => {
              return chapter ? `${positionName} in ${chapter.name} Chapter` : positionName;
            })
            .join('\n')}
        </Paragraph>
      ),
    },
  ];

  return columns;
};
