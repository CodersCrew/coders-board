import React from 'react';
import { ApolloProvider as Provider } from '@apollo/client';

import { FC } from '@/typings/components';

import { apolloClient } from './apolloClient';

export const ApolloProvider: FC = ({ children }) => <Provider client={apolloClient}>{children}</Provider>;
