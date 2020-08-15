import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type ClansQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type ClansQuery = { __typename?: 'Query' } & {
  clans: Array<{ __typename?: 'Clan' } & Pick<Types.Clan, 'id' | 'name' | 'description' | 'image'>>;
};

export const ClansDocument = gql`
  query clans($guildId: ID!) {
    clans(guildId: $guildId) {
      id
      name
      description
      image
    }
  }
`;

/**
 * __useClansQuery__
 *
 * To run a query within a React component, call `useClansQuery` and pass it any options that fit your needs.
 * When your component renders, `useClansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClansQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useClansQuery(baseOptions?: Apollo.QueryHookOptions<ClansQuery, ClansQueryVariables>) {
  return Apollo.useQuery<ClansQuery, ClansQueryVariables>(ClansDocument, baseOptions);
}
export function useClansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClansQuery, ClansQueryVariables>) {
  return Apollo.useLazyQuery<ClansQuery, ClansQueryVariables>(ClansDocument, baseOptions);
}
export type ClansQueryHookResult = ReturnType<typeof useClansQuery>;
export type ClansLazyQueryHookResult = ReturnType<typeof useClansLazyQuery>;
export type ClansQueryResult = Apollo.QueryResult<ClansQuery, ClansQueryVariables>;
