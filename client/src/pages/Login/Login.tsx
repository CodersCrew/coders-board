import React from 'react';

import { Button, Title } from '@/components/atoms';
import { SERVER_URL } from '@/config/env';

const Login = () => {
  const loginUrl = `${SERVER_URL}/auth/google`;

  return (
    <div>
      <Title>Login page</Title>
      <Button type="primary" href={loginUrl}>
        Log in
      </Button>
    </div>
  );
};

export default Login;
