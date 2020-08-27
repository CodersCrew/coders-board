import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';

import { GlobalStyles } from '@/components/GlobalStyles';
import { apolloClient } from '@/config/apolloClient';
import { theme } from '@/config/theme';

import { FC } from './typings/components';

const Providers: FC = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default Providers;
