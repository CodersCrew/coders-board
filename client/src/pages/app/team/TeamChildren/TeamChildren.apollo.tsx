import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../typings/graphql';

export type TeamChildrenQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type TeamChildrenQuery = { __typename?: 'Query' } & {
  team: { __typename?: 'Team' } & Pick<Types.Team, 'id'> & {
      children: Array<{ __typename?: 'Team' } & Pick<Types.Team, 'id' | 'name' | 'image' | 'description' | 'kind'>>;
    };
};

export const TeamChildrenDocument = gql`
  query teamChildren($id: ID!) {
    team(id: $id) {
      id
      children {
        id
        name
        image
        description
        kind
      }
    }
  }
`;

/**
 * __useTeamChildrenQuery__
 *
 * To run a query within a React component, call `useTeamChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamChildrenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamChildrenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<TeamChildrenQuery, TeamChildrenQueryVariables>,
) {
  return ApolloReactHooks.useQuery<TeamChildrenQuery, TeamChildrenQueryVariables>(TeamChildrenDocument, baseOptions);
}
export function useTeamChildrenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TeamChildrenQuery, TeamChildrenQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<TeamChildrenQuery, TeamChildrenQueryVariables>(
    TeamChildrenDocument,
    baseOptions,
  );
}
export type TeamChildrenQueryHookResult = ReturnType<typeof useTeamChildrenQuery>;
export type TeamChildrenLazyQueryHookResult = ReturnType<typeof useTeamChildrenLazyQuery>;
export type TeamChildrenQueryResult = ApolloReactCommon.QueryResult<TeamChildrenQuery, TeamChildrenQueryVariables>;
