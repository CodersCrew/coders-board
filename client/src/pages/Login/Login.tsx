import React from 'react';
import { GoogleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { AppLogo, Box, Button, Paragraph } from '@/components/atoms';
import { SERVER_URL } from '@/config/env';

const Container = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.colors.background.dark,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.colors.text.white,
}));

const Login = () => {
  const loginUrl = `${SERVER_URL}/auth/google`;

  return (
    <Container pb={120} px={32}>
      <AppLogo width={320} height={80} mb={8} />
      <Paragraph fontSize="h3" color="inherit" textAlign="center">
        One place for CodersCrew overview and management
      </Paragraph>
      <Button mt={40} ghost href={loginUrl} size="large" icon={<GoogleOutlined />}>
        Log in with Google
      </Button>
      <Paragraph mt={40} color="inherit" large textAlign="center" maxWidth={400}>
        To access the platform, log in with your CodersCrew Google account.
      </Paragraph>
    </Container>
  );
};

export default Login;
