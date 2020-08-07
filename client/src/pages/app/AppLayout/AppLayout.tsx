import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Layout } from 'antd';

import { useAuth } from '@/graphql/users';
import { useToggle } from '@/hooks/useToggle';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

const { Content } = Layout;

const StyledContent = styled(Content)(({ theme }) => ({
  height: 'calc(100vh - 64px)',
  background: theme.colors.background.body,
  overflow: 'auto',
}));

const AppLayout = () => {
  const sidebarToggle = useToggle(false);
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthorized) {
    navigate('/login');
  }

  return (
    <Layout>
      <Sidebar collapsed={sidebarToggle.on} />
      <Layout>
        <Header isSidebarCollapsed={sidebarToggle.on} toggleSidebar={sidebarToggle.toggle} />
        <StyledContent>
          <Outlet />
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
