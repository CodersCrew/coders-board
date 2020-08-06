import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../typings/graphql';

export type GuildLayoutGuildQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type GuildLayoutGuildQuery = { __typename?: 'Query' } & {
  guild: { __typename?: 'Guild' } & Pick<Types.Guild, 'id' | 'name' | 'description' | 'image'>;
};

export const GuildLayoutGuildDocument = gql`
  query guildLayoutGuild($id: ID!) {
    guild(id: $id) {
      id
      name
      description
      image
    }
  }
`;

/**
 * __useGuildLayoutGuildQuery__
 *
 * To run a query within a React component, call `useGuildLayoutGuildQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildLayoutGuildQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildLayoutGuildQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGuildLayoutGuildQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GuildLayoutGuildQuery, GuildLayoutGuildQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GuildLayoutGuildQuery, GuildLayoutGuildQueryVariables>(
    GuildLayoutGuildDocument,
    baseOptions,
  );
}
export function useGuildLayoutGuildLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GuildLayoutGuildQuery, GuildLayoutGuildQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GuildLayoutGuildQuery, GuildLayoutGuildQueryVariables>(
    GuildLayoutGuildDocument,
    baseOptions,
  );
}
export type GuildLayoutGuildQueryHookResult = ReturnType<typeof useGuildLayoutGuildQuery>;
export type GuildLayoutGuildLazyQueryHookResult = ReturnType<typeof useGuildLayoutGuildLazyQuery>;
export type GuildLayoutGuildQueryResult = ApolloReactCommon.QueryResult<
  GuildLayoutGuildQuery,
  GuildLayoutGuildQueryVariables
>;
