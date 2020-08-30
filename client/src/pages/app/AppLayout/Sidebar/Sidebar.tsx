import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ContactsOutlined, PartitionOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Layout, Menu } from 'antd';
import { SiderProps } from 'antd/lib/layout';

import { Box } from '@/components/atoms';
import { useMediaQuery } from '@/services/styling';
import { CFC } from '@/typings/components';

import { UserMenu } from './UserMenu';

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

const useSelectedKeys = () => {
  const location = useLocation();
  const regexResult = /\/app\/(\w*)\/?/.exec(location.pathname);

  let selectedKey = regexResult ? regexResult[1] : '';

  if (['squad', 'guild'].includes(selectedKey)) {
    selectedKey = 'teams';
  }

  return selectedKey ? [selectedKey] : [];
};

const menuItems = [
  {
    key: 'users',
    label: 'Members',
    icon: <ContactsOutlined />,
  },
  {
    key: 'teams',
    label: 'Teams',
    icon: <TeamOutlined />,
  },
  {
    key: 'positions',
    label: 'Positions',
    icon: <PartitionOutlined />,
  },
  {
    key: 'successes',
    label: 'Successes',
    icon: <TrophyOutlined />,
  },
];

export const Sidebar: CFC<SidebarProps> = props => {
  const selectedKeys = useSelectedKeys();
  const collapsed = useMediaQuery('down', 'md');

  const logoSrc = `/logo-${collapsed ? 'short' : 'long'}.svg`;

  return (
    <StyledSider {...props} collapsible trigger={null} collapsed={collapsed}>
      <Logo src={logoSrc} alt="CodersBoard logo" />
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
        {menuItems.map(({ key, label, icon }) => (
          <Menu.Item key={key} icon={icon}>
            <Link to={`/app/${key}`}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <Box mt="auto">
        <UserMenu collapsed={collapsed} />
      </Box>
    </StyledSider>
  );
};
