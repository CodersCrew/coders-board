import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/graphql/users';

const NotFound = () => {
  const auth = useAuth();

  const navigatePath = auth.isAuthorized ? '/app' : '/login';

  return <Navigate to={navigatePath} />;
};

export default NotFound;
