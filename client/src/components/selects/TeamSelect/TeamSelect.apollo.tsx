import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type TeamSelectTeamsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TeamSelectTeamsQuery = { __typename?: 'Query' } & {
  teams: Array<{ __typename?: 'Team' } & Pick<Types.Team, 'id' | 'name' | 'kind'>>;
};

export const TeamSelectTeamsDocument = gql`
  query teamSelectTeams {
    teams {
      id
      name
      kind
    }
  }
`;

/**
 * __useTeamSelectTeamsQuery__
 *
 * To run a query within a React component, call `useTeamSelectTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamSelectTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamSelectTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamSelectTeamsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<TeamSelectTeamsQuery, TeamSelectTeamsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<TeamSelectTeamsQuery, TeamSelectTeamsQueryVariables>(
    TeamSelectTeamsDocument,
    baseOptions,
  );
}
export function useTeamSelectTeamsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TeamSelectTeamsQuery, TeamSelectTeamsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<TeamSelectTeamsQuery, TeamSelectTeamsQueryVariables>(
    TeamSelectTeamsDocument,
    baseOptions,
  );
}
export type TeamSelectTeamsQueryHookResult = ReturnType<typeof useTeamSelectTeamsQuery>;
export type TeamSelectTeamsLazyQueryHookResult = ReturnType<typeof useTeamSelectTeamsLazyQuery>;
export type TeamSelectTeamsQueryResult = ApolloReactCommon.QueryResult<
  TeamSelectTeamsQuery,
  TeamSelectTeamsQueryVariables
>;
