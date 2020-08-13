import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { Button, Title } from '@/components/atoms';
import { useAuth } from '@/graphql/users';

const NotFound = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.isAuthorized) {
    return <Navigate to="/login" />;
  }

  const handleClick = () => navigate('/app/members');

  return (
    <div>
      <Title>404 Not found</Title>
      <Button type="primary" onClick={handleClick}>
        Back to dashboard
      </Button>
    </div>
  );
};

export default NotFound;
