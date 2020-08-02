import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

import { LoadingScreen } from './LoadingScreen';

const MainLayout = () => {
  const [initialized, setInitialized] = useState(false);
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading && !initialized) {
      setInitialized(true);
    }
  }, [loading]);

  return initialized ? <Outlet /> : <LoadingScreen />;
};

export default MainLayout;
