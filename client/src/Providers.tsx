import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from '@/services/graphql';
import { QueryParamsProvider } from '@/services/routing';
import { ThemeProvider } from '@/services/styling';

import { FC } from './typings/components';

const Providers: FC = ({ children }) => (
  <BrowserRouter>
    <QueryParamsProvider>
      <ApolloProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ApolloProvider>
    </QueryParamsProvider>
  </BrowserRouter>
);

export default Providers;
