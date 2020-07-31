import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../../typings/graphql';

export type DeleteTeamPositionMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeleteTeamPositionMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteMemberPosition'>;

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
