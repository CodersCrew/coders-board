import React from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Dropdown, Menu } from 'antd';
import { lighten } from 'polished';

import { Avatar, Box, LinkMenuItem, Paragraph } from '@/components/atoms';
import { useAuthorizedUser } from '@/graphql/users';
import { CFC } from '@/typings/components';

type UserMenuProps = {
  collapsed: boolean;
};

const UserDropdownContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  padding: 16,
  backgroundColor: lighten(0.1, theme.colors.background.dark),
  color: theme.colors.text.white,
}));

export const UserMenu: CFC<UserMenuProps> = ({ collapsed }) => {
  const authorizedUser = useAuthorizedUser();

  const menu = (
    <Menu theme="dark">
      <LinkMenuItem key="profile" icon={<UserOutlined />} to={`/app/profile/${authorizedUser.id}`}>
        My profile
      </LinkMenuItem>
      <Menu.Item key="logout" onClick={authorizedUser.signOut} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <UserDropdownContent justifyContent={collapsed ? 'center' : 'flex-start'}>
        <Avatar src={authorizedUser.thumbnail} size={32} />
        {!collapsed && (
          <Paragraph ml={12} color="inherit">
            {authorizedUser.fullName}
          </Paragraph>
        )}
      </UserDropdownContent>
    </Dropdown>
  );
};
