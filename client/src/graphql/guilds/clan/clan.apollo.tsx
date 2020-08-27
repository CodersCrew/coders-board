import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type ClansQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type ClansQuery = { __typename?: 'Query' } & {
  clans: Array<{ __typename?: 'Clan' } & Pick<Types.Clan, 'id' | 'name' | 'description' | 'image'>>;
};

export type SimpleClansQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type SimpleClansQuery = { __typename?: 'Query' } & {
  clans: Array<{ __typename?: 'Clan' } & Pick<Types.Clan, 'id' | 'name'>>;
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
export const SimpleClansDocument = gql`
  query simpleClans($guildId: ID!) {
    clans(guildId: $guildId) {
      id
      name
    }
  }
`;

/**
 * __useSimpleClansQuery__
 *
 * To run a query within a React component, call `useSimpleClansQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleClansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleClansQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useSimpleClansQuery(
  baseOptions?: Apollo.QueryHookOptions<SimpleClansQuery, SimpleClansQueryVariables>,
) {
  return Apollo.useQuery<SimpleClansQuery, SimpleClansQueryVariables>(SimpleClansDocument, baseOptions);
}
export function useSimpleClansLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SimpleClansQuery, SimpleClansQueryVariables>,
) {
  return Apollo.useLazyQuery<SimpleClansQuery, SimpleClansQueryVariables>(SimpleClansDocument, baseOptions);
}
export type SimpleClansQueryHookResult = ReturnType<typeof useSimpleClansQuery>;
export type SimpleClansLazyQueryHookResult = ReturnType<typeof useSimpleClansLazyQuery>;
export type SimpleClansQueryResult = Apollo.QueryResult<SimpleClansQuery, SimpleClansQueryVariables>;
