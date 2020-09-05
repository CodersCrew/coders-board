import React from 'react';
import { GoogleOutlined } from '@ant-design/icons';

import { Button, Paragraph } from '@/components/atoms';
import { SERVER_URL } from '@/config/env';

export const ProductionLogin = () => {
  const loginUrl = `${SERVER_URL}/auth/google`;

  return (
    <>
      <Button ghost href={loginUrl} size="large" icon={<GoogleOutlined />}>
        Log in with Google
      </Button>
      <Paragraph mt={40} color="inherit" large textAlign="center" maxWidth={400}>
        To access the platform, log in with your CodersCrew Google account.
      </Paragraph>
    </>
  );
};
