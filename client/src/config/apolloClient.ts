import { ApolloClient, InMemoryCache } from '@apollo/client';

import { SERVER_URL } from './env';

export const apolloClient = new ApolloClient({
  uri: `${SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: 'include',
});
