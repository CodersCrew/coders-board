import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type GuildQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type GuildQuery = { guild: Pick<Types.Guild, 'id' | 'name' | 'description' | 'image'> };

export type SimpleGuildsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type SimpleGuildsQuery = { guilds: Array<Pick<Types.Guild, 'id' | 'name'>> };

export type GuildsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GuildsQuery = { guilds: Array<Pick<Types.Guild, 'id' | 'name' | 'description' | 'color' | 'image'>> };

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
export const SimpleGuildsDocument = gql`
  query simpleGuilds {
    guilds {
      id
      name
    }
  }
`;

/**
 * __useSimpleGuildsQuery__
 *
 * To run a query within a React component, call `useSimpleGuildsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleGuildsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleGuildsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSimpleGuildsQuery(
  baseOptions?: Apollo.QueryHookOptions<SimpleGuildsQuery, SimpleGuildsQueryVariables>,
) {
  return Apollo.useQuery<SimpleGuildsQuery, SimpleGuildsQueryVariables>(SimpleGuildsDocument, baseOptions);
}
export function useSimpleGuildsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SimpleGuildsQuery, SimpleGuildsQueryVariables>,
) {
  return Apollo.useLazyQuery<SimpleGuildsQuery, SimpleGuildsQueryVariables>(SimpleGuildsDocument, baseOptions);
}
export type SimpleGuildsQueryHookResult = ReturnType<typeof useSimpleGuildsQuery>;
export type SimpleGuildsLazyQueryHookResult = ReturnType<typeof useSimpleGuildsLazyQuery>;
export type SimpleGuildsQueryResult = Apollo.QueryResult<SimpleGuildsQuery, SimpleGuildsQueryVariables>;
export const GuildsDocument = gql`
  query guilds {
    guilds {
      id
      name
      description
      color
      image
    }
  }
`;

/**
 * __useGuildsQuery__
 *
 * To run a query within a React component, call `useGuildsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGuildsQuery(baseOptions?: Apollo.QueryHookOptions<GuildsQuery, GuildsQueryVariables>) {
  return Apollo.useQuery<GuildsQuery, GuildsQueryVariables>(GuildsDocument, baseOptions);
}
export function useGuildsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GuildsQuery, GuildsQueryVariables>) {
  return Apollo.useLazyQuery<GuildsQuery, GuildsQueryVariables>(GuildsDocument, baseOptions);
}
export type GuildsQueryHookResult = ReturnType<typeof useGuildsQuery>;
export type GuildsLazyQueryHookResult = ReturnType<typeof useGuildsLazyQuery>;
export type GuildsQueryResult = Apollo.QueryResult<GuildsQuery, GuildsQueryVariables>;
