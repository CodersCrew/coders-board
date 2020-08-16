import React from 'react';
import { CrownOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { Box, Button, Icon, Paragraph } from '@/components/atoms';
import { UseSquadMembers } from '@/graphql/squads';
import { TeamRole } from '@/typings/graphql';

import { useSquadContext } from '../SquadContext';
import { SquadMemberModalProps } from './SquadMemberModal';
import { useDeleteSquadMemberConfirm } from './useDeleteSquadMemberConfirm';

type Member = UseSquadMembers['item'];
type Columns = ColumnsType<Member>;

type Params = {
  openModal: (data: SquadMemberModalProps['data']) => void;
};

export const useSquadMembersColumns = ({ openModal }: Params) => {
  const { squadRole } = useSquadContext();
  const deleteSquadMemberConfirm = useDeleteSquadMemberConfirm();

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

  if (squadRole.isManager) {
    const menu = (member: Member) => (
      <Menu>
        <Menu.Item
          onClick={() =>
            openModal({
              id: member.id,
              role: member.role,
              userId: member.user.id,
            })
          }
          icon={<Icon icon={CrownOutlined} />}
        >
          Change role
        </Menu.Item>
        <Menu.Item
          danger
          onClick={() => deleteSquadMemberConfirm({ id: member.id, fullName: member.user.fullName })}
          icon={<Icon icon={DeleteOutlined} />}
        >
          Delete member
        </Menu.Item>
      </Menu>
    );

    columns.push({
      align: 'right',
      fixed: 'right',
      render: (_, member) => {
        return (
          <Dropdown overlay={menu(member)} trigger={['click']}>
            <Button type="link" icon={<Icon icon={MoreOutlined} color="text.secondary" />} />
          </Dropdown>
        );
      },
    });
  }

  return columns;
};
