import React from 'react';
import { DeleteOutlined, MoreOutlined, SlackOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { Box, Button, Icon, Paragraph } from '@/components/atoms';
import { useAuthorizedUser, UseUsers } from '@/graphql/users';

import { SyncSlackModalProps } from './SyncSlackModal';

type User = UseUsers['item'];
type Columns = ColumnsType<User>;

type Params = {
  openSyncSlackModal: (data: SyncSlackModalProps['data']) => void;
};

export const useUsersColumns = ({ openSyncSlackModal }: Params) => {
  const { isAdmin } = useAuthorizedUser();

  const menu = (user: User) => (
    <Menu>
      {!user.slackId && (
        <Menu.Item icon={<SlackOutlined />} onClick={() => openSyncSlackModal({ userId: user.id })}>
          Sync with Slack
        </Menu.Item>
      )}
      <Menu.Item danger icon={<Icon icon={DeleteOutlined} />}>
        Remove user
      </Menu.Item>
    </Menu>
  );

  const columns: Columns = [
    {
      title: 'Full name',
      dataIndex: 'firstName',
      width: 216,
      fixed: true,
      render: (_, { firstName, lastName, image }) => (
        <Box px={4} display="flex" alignItems="center">
          <Avatar size="small" src={image} />
          <Paragraph ml={12}>
            {firstName} {lastName}
          </Paragraph>
        </Box>
      ),
    },
    {
      title: 'CodersCrew email',
      dataIndex: 'primaryEmail',
      width: 280,
    },
    {
      title: 'Private email',
      dataIndex: 'recoveryEmail',
      width: 280,
    },
    {
      title: 'Slack',
      dataIndex: 'slackId',
      render: (_, { slackId }) => {
        return slackId ? <Tag color="success">Integrated</Tag> : <Tag color="error">Non-integrated</Tag>;
      },
    },
    {
      align: 'right',
      fixed: 'right',
      render: (_, user) => {
        if (!isAdmin) return null;

        return (
          <Dropdown overlay={menu(user)} trigger={['click']}>
            <Button type="link" icon={<Icon icon={MoreOutlined} color="text.secondary" />} />
          </Dropdown>
        );
      },
    },
  ];

  return columns;
};
