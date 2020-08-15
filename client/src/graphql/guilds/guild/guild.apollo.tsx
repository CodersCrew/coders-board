import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type GuildQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type GuildQuery = { __typename?: 'Query' } & {
  guild: { __typename?: 'Guild' } & Pick<Types.Guild, 'id' | 'name' | 'description' | 'image'>;
};

export const GuildDocument = gql`
  query guild($id: ID!) {
    guild(id: $id) {
      id
      name
      description
      image
    }
  }
`;

/**
 * __useGuildQuery__
 *
 * To run a query within a React component, call `useGuildQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGuildQuery(baseOptions?: Apollo.QueryHookOptions<GuildQuery, GuildQueryVariables>) {
  return Apollo.useQuery<GuildQuery, GuildQueryVariables>(GuildDocument, baseOptions);
}
export function useGuildLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GuildQuery, GuildQueryVariables>) {
  return Apollo.useLazyQuery<GuildQuery, GuildQueryVariables>(GuildDocument, baseOptions);
}
export type GuildQueryHookResult = ReturnType<typeof useGuildQuery>;
export type GuildLazyQueryHookResult = ReturnType<typeof useGuildLazyQuery>;
export type GuildQueryResult = Apollo.QueryResult<GuildQuery, GuildQueryVariables>;
