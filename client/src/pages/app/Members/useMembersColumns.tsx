import React from 'react';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { Box, Button, Icon, Paragraph } from '@/components/atoms';
import { useAuthorizedUser, UseUsers } from '@/graphql/users';

type Member = UseUsers['item'];
type Columns = ColumnsType<Member>;

export const useMembersColumns = () => {
  const { isAdmin } = useAuthorizedUser();

  const menu = (
    <Menu>
      <Menu.Item danger icon={<Icon icon={DeleteOutlined} />}>
        Remove member
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
      align: 'right',
      fixed: 'right',
      render: () => {
        if (!isAdmin) return null;

        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="link" icon={<Icon icon={MoreOutlined} color="text.secondary" />} />
          </Dropdown>
        );
      },
    },
  ];

  return columns;
};
