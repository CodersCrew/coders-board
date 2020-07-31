import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContactsOutlined, PartitionOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { SiderProps } from 'antd/lib/layout';
import { MenuProps } from 'antd/lib/menu';

import { Box } from '@/components/atoms';
import { CFC } from '@/typings/components';

type SidebarProps = SiderProps & {
  collapsed: boolean;
};

const useSelectedKeys = () => {
  const location = useLocation();
  const regexResult = /\/app\/(\w*)\/?/.exec(location.pathname);
  const selectedKey = regexResult && regexResult[1];

  return selectedKey ? [selectedKey] : [];
};

export const Sidebar: CFC<SidebarProps> = props => {
  const navigate = useNavigate();
  const selectedKeys = useSelectedKeys();

  const handleItemClick: MenuProps['onClick'] = ({ key }) => {
    navigate(`/app/${key}`);
  };

  return (
    <Layout.Sider trigger={null} collapsible {...props}>
      <Box height={32} backgroundColor="rgba(255, 255, 255, 0.2)" margin={16} />
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
