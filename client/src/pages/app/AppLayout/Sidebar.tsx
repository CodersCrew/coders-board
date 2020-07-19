import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOutlined, PartitionOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { SiderProps } from 'antd/lib/layout';
import { MenuProps } from 'antd/lib/menu';

import { Box } from '@/components/atoms';
import { CFC } from '@/typings/components';

type SidebarProps = SiderProps & {
  collapsed: boolean;
};

export const Sidebar: CFC<SidebarProps> = props => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick: MenuProps['onClick'] = ({ key }) => {
    navigate(`/app/${key}`);
  };

  return (
    <Layout.Sider trigger={null} collapsible {...props}>
      <Box height={32} backgroundColor="rgba(255, 255, 255, 0.2)" margin={16} />
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleItemClick}
        selectedKeys={[location.pathname.replace('/app/', '')]}
      >
        <Menu.Item key="members" icon={<TeamOutlined />}>
          Members
        </Menu.Item>
        <Menu.Item key="teams" icon={<PartitionOutlined />}>
          Teams
        </Menu.Item>
        <Menu.Item key="knowledge-base" icon={<BookOutlined />}>
          Knowledge base
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};
