import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { message } from 'antd';

import { GlobalStyles } from '@/components/GlobalStyles';
import { apolloClient } from '@/config/apolloClient';
import { theme } from '@/config/theme';
import { FC } from '@/typings/components';

message.config({
  maxCount: 1,
});

export const Providers: FC = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
};
