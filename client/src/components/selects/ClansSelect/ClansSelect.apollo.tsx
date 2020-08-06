import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type ClansSelectClansQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type ClansSelectClansQuery = { __typename?: 'Query' } & {
  clans: Array<{ __typename?: 'Clan' } & Pick<Types.Clan, 'id' | 'name'>>;
};

export const ClansSelectClansDocument = gql`
  query clansSelectClans($guildId: ID!) {
    clans(guildId: $guildId) {
      id
      name
    }
  }
`;

/**
 * __useClansSelectClansQuery__
 *
 * To run a query within a React component, call `useClansSelectClansQuery` and pass it any options that fit your needs.
 * When your component renders, `useClansSelectClansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClansSelectClansQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useClansSelectClansQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ClansSelectClansQuery, ClansSelectClansQueryVariables>,
) {
  return ApolloReactHooks.useQuery<ClansSelectClansQuery, ClansSelectClansQueryVariables>(
    ClansSelectClansDocument,
    baseOptions,
  );
}
export function useClansSelectClansLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClansSelectClansQuery, ClansSelectClansQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<ClansSelectClansQuery, ClansSelectClansQueryVariables>(
    ClansSelectClansDocument,
    baseOptions,
  );
}
export type ClansSelectClansQueryHookResult = ReturnType<typeof useClansSelectClansQuery>;
export type ClansSelectClansLazyQueryHookResult = ReturnType<typeof useClansSelectClansLazyQuery>;
export type ClansSelectClansQueryResult = ApolloReactCommon.QueryResult<
  ClansSelectClansQuery,
  ClansSelectClansQueryVariables
>;
