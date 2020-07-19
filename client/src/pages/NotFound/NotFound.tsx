import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Title } from '@/components/atoms';
import { useAuth } from '@/hooks/useAuth';

const NotFound = () => {
  const { isAuthorized } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(isAuthorized ? '/app/members' : '/login');
  };

  return (
    <div>
      <Title>404 Not found</Title>
      <Button type="primary" onClick={handleClick}>
        {isAuthorized ? 'Back to dashboard' : 'Back to login page'}
      </Button>
    </div>
  );
};

export default NotFound;
