import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../typings/graphql';

export type TeamQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type TeamQuery = { __typename?: 'Query' } & {
  team: { __typename?: 'Team' } & Pick<Types.Team, 'id' | 'name' | 'image' | 'description' | 'color' | 'kind'> & {
      parent?: Types.Maybe<{ __typename?: 'Team' } & Pick<Types.Team, 'id' | 'name'>>;
      children: Array<{ __typename?: 'Team' } & Pick<Types.Team, 'id'>>;
      members: Array<{ __typename?: 'Team' } & Pick<Types.Team, 'id'>>;
    };
};

export const TeamDocument = gql`
  query team($id: ID!) {
    team(id: $id) {
      id
      name
      image
      description
      color
      kind
      parent {
        id
        name
      }
      children {
        id
      }
      members {
        id
      }
    }
  }
`;

/**
 * __useTeamQuery__
 *
 * To run a query within a React component, call `useTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TeamQuery, TeamQueryVariables>) {
  return ApolloReactHooks.useQuery<TeamQuery, TeamQueryVariables>(TeamDocument, baseOptions);
}
export function useTeamLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TeamQuery, TeamQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<TeamQuery, TeamQueryVariables>(TeamDocument, baseOptions);
}
export type TeamQueryHookResult = ReturnType<typeof useTeamQuery>;
export type TeamLazyQueryHookResult = ReturnType<typeof useTeamLazyQuery>;
export type TeamQueryResult = ApolloReactCommon.QueryResult<TeamQuery, TeamQueryVariables>;
