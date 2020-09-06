import React from 'react';
import styled from '@emotion/styled';

import { AppLogo, Box, Paragraph } from '@/components/atoms';
import { APP_ENV } from '@/config/env';

import { LocalLogin } from './LocalLogin';
import { ProductionLogin } from './ProductionLogin';

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
  return (
    <Container pb={120} px={32}>
      <AppLogo width={320} height={80} mb={8} />
      <Paragraph fontSize="h3" color="inherit" textAlign="center" mb={40}>
        One place for CodersCrew overview and management
      </Paragraph>
      {APP_ENV === 'production' ? <ProductionLogin /> : <LocalLogin />}
    </Container>
  );
};

export default Login;
