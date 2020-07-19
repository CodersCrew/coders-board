import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type TeamsListFieldsFragment = { __typename?: 'Team' } & Pick<
  Types.Team,
  'id' | 'name' | 'image' | 'description'
> & { children: Array<{ __typename?: 'Team' } & Pick<Types.Team, 'id'>> };

export type TeamsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type TeamsQuery = { __typename?: 'Query' } & {
  squads: Array<{ __typename?: 'Team' } & TeamsListFieldsFragment>;
  guilds: Array<{ __typename?: 'Team' } & TeamsListFieldsFragment>;
  taskforces: Array<{ __typename?: 'Team' } & TeamsListFieldsFragment>;
};

export const TeamsListFieldsFragmentDoc = gql`
  fragment teamsListFields on Team {
    id
    name
    image
    description
    children {
      id
    }
  }
`;
export const TeamsDocument = gql`
  query teams {
    squads: teams(kind: SQUAD) {
      ...teamsListFields
    }
    guilds: teams(kind: GUILD) {
      ...teamsListFields
    }
    taskforces: teams(kind: TASKFORCE) {
      ...teamsListFields
    }
  }
  ${TeamsListFieldsFragmentDoc}
`;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
  return ApolloReactHooks.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
}
export function useTeamsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
}
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = ApolloReactCommon.QueryResult<TeamsQuery, TeamsQueryVariables>;
