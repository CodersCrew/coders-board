import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CrownOutlined, DeleteOutlined, MoreOutlined, PartitionOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { Box, Button, Icon, Paragraph } from '@/components/atoms';
import { UseGuildMembers } from '@/graphql/guilds';
import { useModalState } from '@/hooks/useModalState';
import { TeamRole } from '@/typings/graphql';
import { parseGuildPositionKind } from '@/utils/platform';

import { useGuildContext } from '../GuildContext';
import { GuildMemberModalProps } from './GuildMemberModal';
import { useDeleteGuildMemberConfirm } from './useDeleteGuildMemberConfirm';

type Member = UseGuildMembers['item'];
type Columns = ColumnsType<Member>;

export const useGuildMembersColumns = () => {
  const navigate = useNavigate();
  const { guildRole } = useGuildContext();
  const deleteGuildMemberConfirm = useDeleteGuildMemberConfirm();
  const guildMemberModal = useModalState<GuildMemberModalProps['data']>();

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
      render: (_, { positions }) => {
        return positions
          .map(({ kind, clan }) => {
            const kindName = parseGuildPositionKind(kind);
            return clan ? `${kindName} in ${clan.name} Clan` : `${kindName} of the guild`;
          })
          .join(', ');
      },
    },
  ];

  if (guildRole.isManager) {
    const menu = (member: Member) => (
      <Menu>
        <Menu.Item
          onClick={() => navigate(`../positions?search=${member.user.fullName}`)}
          icon={<Icon icon={PartitionOutlined} />}
        >
          Manage positions
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            guildMemberModal.open({
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
          onClick={() => deleteGuildMemberConfirm({ id: member.id, fullName: member.user.fullName })}
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
