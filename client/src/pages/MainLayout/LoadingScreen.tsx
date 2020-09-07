import React from 'react';
import styled from '@emotion/styled';

import { Paragraph, Spin } from '@/components/atoms';

const Container = styled.div(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.colors.background.dark,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Logo = styled.img({
  width: 320,
  height: 80,
});

export const LoadingScreen = () => {
  return (
    <Container>
      <Logo src="/logo-long.svg" />
      <Paragraph fontSize="h3" color="text.white">
        Loading
      </Paragraph>
      <Spin mt={40} size="large" />
    </Container>
  );
};
