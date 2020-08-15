import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type GuildSelectGuildsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GuildSelectGuildsQuery = { __typename?: 'Query' } & {
  guilds: Array<{ __typename?: 'Guild' } & Pick<Types.Guild, 'id' | 'name'>>;
};

export const GuildSelectGuildsDocument = gql`
  query guildSelectGuilds {
    guilds {
      id
      name
    }
  }
`;

/**
 * __useGuildSelectGuildsQuery__
 *
 * To run a query within a React component, call `useGuildSelectGuildsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildSelectGuildsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildSelectGuildsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGuildSelectGuildsQuery(
  baseOptions?: Apollo.QueryHookOptions<GuildSelectGuildsQuery, GuildSelectGuildsQueryVariables>,
) {
  return Apollo.useQuery<GuildSelectGuildsQuery, GuildSelectGuildsQueryVariables>(
    GuildSelectGuildsDocument,
    baseOptions,
  );
}
export function useGuildSelectGuildsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GuildSelectGuildsQuery, GuildSelectGuildsQueryVariables>,
) {
  return Apollo.useLazyQuery<GuildSelectGuildsQuery, GuildSelectGuildsQueryVariables>(
    GuildSelectGuildsDocument,
    baseOptions,
  );
}
export type GuildSelectGuildsQueryHookResult = ReturnType<typeof useGuildSelectGuildsQuery>;
export type GuildSelectGuildsLazyQueryHookResult = ReturnType<typeof useGuildSelectGuildsLazyQuery>;
export type GuildSelectGuildsQueryResult = Apollo.QueryResult<GuildSelectGuildsQuery, GuildSelectGuildsQueryVariables>;
