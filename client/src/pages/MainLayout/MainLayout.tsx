import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/graphql/users';

import { LoadingScreen } from './LoadingScreen';

const MainLayout = () => {
  const [initialized, setInitialized] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (!auth.loading && !initialized) {
      setInitialized(true);
    }
  }, [auth.loading]);

  return initialized ? <Outlet /> : <LoadingScreen />;
};

export default MainLayout;
