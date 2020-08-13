import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Layout } from 'antd';

import { useAuth } from '@/graphql/users';

import { Sidebar } from './Sidebar';

const { Content } = Layout;

const StyledContent = styled(Content)(({ theme }) => ({
  height: '100vh',
  background: theme.colors.background.body,
  overflow: 'auto',
}));

const AppLayout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthorized) {
    navigate('/login');
  }

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <StyledContent>
          <Outlet />
        </StyledContent>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
