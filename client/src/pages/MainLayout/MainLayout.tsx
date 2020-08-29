import React from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/graphql/users';
import { useInitialized } from '@/hooks/useInitialized';

import { AuthCheck } from './AuthCheck';
import { LoadingScreen } from './LoadingScreen';

const MainLayout = () => {
  const auth = useAuth();
  const initialized = useInitialized(!auth.loading);

  return initialized ? (
    <>
      <AuthCheck />
      <Outlet />
    </>
  ) : (
    <LoadingScreen />
  );
};

export default MainLayout;
