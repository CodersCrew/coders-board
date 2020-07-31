import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../typings/graphql';

export type TeamPositionsQueryVariables = Types.Exact<{
  teamId: Types.Scalars['ID'];
}>;

export type TeamPositionsQuery = { __typename?: 'Query' } & {
  teamMembers: Array<
    { __typename?: 'TeamMember' } & Pick<Types.TeamMember, 'id' | 'role'> & {
        user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'firstName' | 'lastName' | 'image'>;
        positions: Array<
          { __typename?: 'MemberPosition' } & Pick<Types.MemberPosition, 'id' | 'from' | 'to' | 'notes'> & {
              position: { __typename?: 'Position' } & Pick<Types.Position, 'id' | 'name'>;
            }
        >;
      }
  >;
};

export type DeleteTeamPositionMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeleteTeamPositionMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteMemberPosition'>;

export const TeamPositionsDocument = gql`
  query teamPositions($teamId: ID!) {
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
        from
        to
        notes
        position {
          id
          name
        }
      }
    }
  }
`;

/**
 * __useTeamPositionsQuery__
 *
 * To run a query within a React component, call `useTeamPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamPositionsQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamPositionsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<TeamPositionsQuery, TeamPositionsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<TeamPositionsQuery, TeamPositionsQueryVariables>(TeamPositionsDocument, baseOptions);
}
export function useTeamPositionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TeamPositionsQuery, TeamPositionsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<TeamPositionsQuery, TeamPositionsQueryVariables>(
    TeamPositionsDocument,
    baseOptions,
  );
}
export type TeamPositionsQueryHookResult = ReturnType<typeof useTeamPositionsQuery>;
export type TeamPositionsLazyQueryHookResult = ReturnType<typeof useTeamPositionsLazyQuery>;
export type TeamPositionsQueryResult = ApolloReactCommon.QueryResult<TeamPositionsQuery, TeamPositionsQueryVariables>;
export const DeleteTeamPositionDocument = gql`
  mutation deleteTeamPosition($id: ID!) {
    deleteMemberPosition(id: $id)
  }
`;
export type DeleteTeamPositionMutationFn = ApolloReactCommon.MutationFunction<
  DeleteTeamPositionMutation,
  DeleteTeamPositionMutationVariables
>;

/**
 * __useDeleteTeamPositionMutation__
 *
 * To run a mutation, you first call `useDeleteTeamPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamPositionMutation, { data, loading, error }] = useDeleteTeamPositionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTeamPositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTeamPositionMutation, DeleteTeamPositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteTeamPositionMutation, DeleteTeamPositionMutationVariables>(
    DeleteTeamPositionDocument,
    baseOptions,
  );
}
export type DeleteTeamPositionMutationHookResult = ReturnType<typeof useDeleteTeamPositionMutation>;
export type DeleteTeamPositionMutationResult = ApolloReactCommon.MutationResult<DeleteTeamPositionMutation>;
export type DeleteTeamPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteTeamPositionMutation,
  DeleteTeamPositionMutationVariables
>;
