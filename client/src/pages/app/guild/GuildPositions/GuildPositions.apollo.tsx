import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../typings/graphql';

export type GuildPositionsQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type GuildPositionsQuery = { __typename?: 'Query' } & {
  guildPositions: Array<
    { __typename?: 'GuildPosition' } & Pick<Types.GuildPosition, 'id' | 'from' | 'to' | 'notes' | 'kind'> & {
        member: { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id'> & {
            user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'fullName' | 'image'>;
          };
        clan?: Types.Maybe<{ __typename?: 'Clan' } & Pick<Types.Clan, 'id' | 'name'>>;
      }
  >;
};

export type GuildMembersIdsQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type GuildMembersIdsQuery = { __typename?: 'Query' } & {
  guildMembers: Array<
    { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id'> & {
        user: { __typename?: 'User' } & Pick<Types.User, 'id'>;
      }
  >;
};

export const GuildPositionsDocument = gql`
  query guildPositions($guildId: ID!) {
    guildPositions(guildId: $guildId) {
      id
      from
      to
      notes
      kind
      member {
        id
        user {
          id
          fullName
          image
        }
      }
      clan {
        id
        name
      }
    }
  }
`;

/**
 * __useGuildPositionsQuery__
 *
 * To run a query within a React component, call `useGuildPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildPositionsQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildPositionsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GuildPositionsQuery, GuildPositionsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GuildPositionsQuery, GuildPositionsQueryVariables>(
    GuildPositionsDocument,
    baseOptions,
  );
}
export function useGuildPositionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GuildPositionsQuery, GuildPositionsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GuildPositionsQuery, GuildPositionsQueryVariables>(
    GuildPositionsDocument,
    baseOptions,
  );
}
export type GuildPositionsQueryHookResult = ReturnType<typeof useGuildPositionsQuery>;
export type GuildPositionsLazyQueryHookResult = ReturnType<typeof useGuildPositionsLazyQuery>;
export type GuildPositionsQueryResult = ApolloReactCommon.QueryResult<
  GuildPositionsQuery,
  GuildPositionsQueryVariables
>;
export const GuildMembersIdsDocument = gql`
  query guildMembersIds($guildId: ID!) {
    guildMembers(guildId: $guildId) {
      id
      user {
        id
      }
    }
  }
`;

/**
 * __useGuildMembersIdsQuery__
 *
 * To run a query within a React component, call `useGuildMembersIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildMembersIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildMembersIdsQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildMembersIdsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>(
    GuildMembersIdsDocument,
    baseOptions,
  );
}
export function useGuildMembersIdsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>(
    GuildMembersIdsDocument,
    baseOptions,
  );
}
export type GuildMembersIdsQueryHookResult = ReturnType<typeof useGuildMembersIdsQuery>;
export type GuildMembersIdsLazyQueryHookResult = ReturnType<typeof useGuildMembersIdsLazyQuery>;
export type GuildMembersIdsQueryResult = ApolloReactCommon.QueryResult<
  GuildMembersIdsQuery,
  GuildMembersIdsQueryVariables
>;
