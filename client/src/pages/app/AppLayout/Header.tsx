import React from 'react';
import { DownOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Dropdown, Layout, Menu } from 'antd';
import { BasicProps } from 'antd/lib/layout/layout';

import { Avatar, Icon, Paragraph } from '@/components/atoms';
import { useAuthorizedUser } from '@/hooks/useAuth';
import { CFC } from '@/typings/components';

type HeaderProps = BasicProps & {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

const StyledHeader = styled(Layout.Header)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 16px',
  background: theme.colors.background.component,
  boxShadow: '0 1px 4px rgba(0,21,41,.08)',
  zIndex: 1,
}));

const UserDropdownContent = styled.div({
  display: 'flex',
  alignItems: 'center',
  minWidth: 160,
  cursor: 'pointer',
});

export const Header: CFC<HeaderProps> = ({ isSidebarCollapsed, toggleSidebar, ...props }) => {
  const { profileImage, fullName, authMutations } = useAuthorizedUser();

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={authMutations.logout}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader {...props}>
      {React.createElement(isSidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggleSidebar,
      })}
      <Dropdown overlay={menu} trigger={['click']}>
        <UserDropdownContent>
          <Avatar src={profileImage} />
          <Paragraph ml={8}>{fullName}</Paragraph>
          <Icon icon={DownOutlined} ml={8} />
        </UserDropdownContent>
      </Dropdown>
    </StyledHeader>
  );
};
