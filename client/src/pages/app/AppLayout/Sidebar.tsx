import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContactsOutlined, LogoutOutlined, PartitionOutlined, TeamOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Dropdown, Layout, Menu } from 'antd';
import { SiderProps } from 'antd/lib/layout';
import { MenuProps } from 'antd/lib/menu';
import { lighten } from 'polished';

import { Avatar, Box, Paragraph } from '@/components/atoms';
import { useAuthorizedUser } from '@/graphql/users';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { CFC } from '@/typings/components';

type SidebarProps = Omit<SiderProps, 'theme'>;

const Logo = styled.img({
  width: 'calc(100% - 32px)',
  height: 32,
  margin: 16,
});

const StyledSider = styled(Layout.Sider)({
  '.ant-layout-sider-children': {
    display: 'flex',
    flexDirection: 'column',
  },
});

const UserDropdownContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  padding: 16,
  marginTop: 'auto',
  backgroundColor: lighten(0.1, theme.colors.background.dark),
  color: theme.colors.text.white,
}));

const useSelectedKeys = () => {
  const location = useLocation();
  const regexResult = /\/app\/(\w*)\/?/.exec(location.pathname);

  let selectedKey = regexResult ? regexResult[1] : '';

  if (['squad', 'guild'].includes(selectedKey)) {
    selectedKey = 'teams';
  }

  return selectedKey ? [selectedKey] : [];
};

export const Sidebar: CFC<SidebarProps> = props => {
  const navigate = useNavigate();
  const selectedKeys = useSelectedKeys();
  const collapsed = useMediaQuery('down', 'md');
  const authorizedUser = useAuthorizedUser();

  const menu = (
    <Menu theme="dark">
      <Menu.Item key="logout" onClick={authorizedUser.logout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const handleItemClick: MenuProps['onClick'] = ({ key }) => {
    navigate(`/app/${key}`);
  };

  const logoSrc = `/logo-${collapsed ? 'short' : 'long'}.svg`;

  return (
    <StyledSider {...props} collapsible trigger={null} collapsed={collapsed}>
      <Logo src={logoSrc} alt="CodersBoard logo" />
      <Menu theme="dark" mode="inline" onClick={handleItemClick} selectedKeys={selectedKeys}>
        <Menu.Item key="members" icon={<ContactsOutlined />}>
          Members
        </Menu.Item>
        <Menu.Item key="teams" icon={<TeamOutlined />}>
          Teams
        </Menu.Item>
        <Menu.Item key="positions" icon={<PartitionOutlined />}>
          Positions
        </Menu.Item>
      </Menu>
      <Dropdown overlay={menu} trigger={['click']}>
        <UserDropdownContent justifyContent={collapsed ? 'center' : 'flex-start'}>
          <Avatar src={authorizedUser.image} size={32} />
          {!collapsed && (
            <Paragraph ml={12} color="inherit">
              {authorizedUser.fullName}
            </Paragraph>
          )}
        </UserDropdownContent>
      </Dropdown>
    </StyledSider>
  );
};
