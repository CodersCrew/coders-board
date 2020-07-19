import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Layout } from 'antd';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useToggle } from '@/hooks/useToggle';

const { Content } = Layout;

const StyledContent = styled(Content)(({ theme }) => ({
  height: 'calc(100vh - 64px)',
  background: theme.colors.background.body,
  overflow: 'auto',
}));

const AppLayout = () => {
  const { on: isSidebarCollapsed, toggle: toggleSidebar } = useToggle(false);
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();

  if (!isAuthorized) {
    navigate('/login');
  }

  return (
    <Layout>
      <Sidebar collapsed={isSidebarCollapsed} />
      <Layout>
        <Header isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <StyledContent>
          <Outlet />
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
