import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../typings/graphql';

export type TeamMembersQueryVariables = Types.Exact<{
  teamId: Types.Scalars['ID'];
}>;

export type TeamMembersQuery = { __typename?: 'Query' } & {
  teamMembers: Array<
    { __typename?: 'TeamMember' } & Pick<Types.TeamMember, 'id' | 'role'> & {
        user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'firstName' | 'lastName' | 'image'>;
        positions: Array<
          { __typename?: 'MemberPosition' } & Pick<Types.MemberPosition, 'id' | 'to'> & {
              position: { __typename?: 'Position' } & Pick<Types.Position, 'id' | 'name'>;
            }
        >;
      }
  >;
};

export const TeamMembersDocument = gql`
  query teamMembers($teamId: ID!) {
    teamMembers(teamId: $teamId) {
      id
      role
      user {
        id
        firstName
        lastName
        image
      }
      positions {
        id
        to
        position {
          id
          name
        }
      }
    }
  }
`;

/**
 * __useTeamMembersQuery__
 *
 * To run a query within a React component, call `useTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamMembersQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamMembersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<TeamMembersQuery, TeamMembersQueryVariables>,
) {
  return ApolloReactHooks.useQuery<TeamMembersQuery, TeamMembersQueryVariables>(TeamMembersDocument, baseOptions);
}
export function useTeamMembersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TeamMembersQuery, TeamMembersQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<TeamMembersQuery, TeamMembersQueryVariables>(TeamMembersDocument, baseOptions);
}
export type TeamMembersQueryHookResult = ReturnType<typeof useTeamMembersQuery>;
export type TeamMembersLazyQueryHookResult = ReturnType<typeof useTeamMembersLazyQuery>;
export type TeamMembersQueryResult = ApolloReactCommon.QueryResult<TeamMembersQuery, TeamMembersQueryVariables>;
