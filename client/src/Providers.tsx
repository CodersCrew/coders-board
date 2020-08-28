import React from 'react';

import { ApolloProvider } from '@/services/graphql';
import { ThemeProvider } from '@/services/styling';

import { FC } from './typings/components';

const Providers: FC = ({ children }) => (
  <ApolloProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </ApolloProvider>
);

export default Providers;
