import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/graphql/users';

export const AuthCheck = () => {
  const auth = useAuth();
  const location = useLocation();

  if (location?.state && 'logout' in location.state) {
    return null;
  }

  return auth.isAuthorized && !location.pathname.includes('/app') ? <Navigate to="/app" /> : null;
};
