import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContactsOutlined, PartitionOutlined, TeamOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Layout, Menu } from 'antd';
import { SiderProps } from 'antd/lib/layout';
import { MenuProps } from 'antd/lib/menu';

import { CFC } from '@/typings/components';

type SidebarProps = SiderProps & {
  collapsed: boolean;
};

const Logo = styled.img({
  width: 'calc(100% - 32px)',
  height: 32,
  margin: 16,
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

export const Sidebar: CFC<SidebarProps> = props => {
  const navigate = useNavigate();
  const selectedKeys = useSelectedKeys();

  const handleItemClick: MenuProps['onClick'] = ({ key }) => {
    navigate(`/app/${key}`);
  };

  const logoSrc = `/logo-${props.collapsed ? 'short' : 'long'}.svg`;

  return (
    <Layout.Sider trigger={null} collapsible {...props}>
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
    </Layout.Sider>
  );
};
