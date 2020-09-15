import React from 'react';
import { Avatar, Tag } from 'antd';

import { Box, Paragraph } from '@/components/atoms';
import { TableColumns } from '@/components/molecules';
import { UseGuildMembers } from '@/graphql/guilds';
import { TeamRole } from '@/typings/graphql';

type Member = UseGuildMembers['item'];

export const useGuildMembersColumns = () => {
  const columns: TableColumns<Member> = [
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
      render: (_, { activePositions }) => (
        <Paragraph whiteSpace="pre-line">
          {activePositions
            .map(({ clan, position: { name: positionName } }) => {
              return clan ? `${positionName} in ${clan.name} clan` : positionName;
            })
            .join('\n')}
        </Paragraph>
      ),
    },
  ];

  return columns;
};
