import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../../typings/graphql';

export type DeleteGuildPositionMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeleteGuildPositionMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteGuildPosition'>;

export const DeleteGuildPositionDocument = gql`
  mutation deleteGuildPosition($id: ID!) {
    deleteGuildPosition(id: $id)
  }
`;
export type DeleteGuildPositionMutationFn = ApolloReactCommon.MutationFunction<
  DeleteGuildPositionMutation,
  DeleteGuildPositionMutationVariables
>;

/**
 * __useDeleteGuildPositionMutation__
 *
 * To run a mutation, you first call `useDeleteGuildPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGuildPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGuildPositionMutation, { data, loading, error }] = useDeleteGuildPositionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGuildPositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteGuildPositionMutation, DeleteGuildPositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteGuildPositionMutation, DeleteGuildPositionMutationVariables>(
    DeleteGuildPositionDocument,
    baseOptions,
  );
}
export type DeleteGuildPositionMutationHookResult = ReturnType<typeof useDeleteGuildPositionMutation>;
export type DeleteGuildPositionMutationResult = ApolloReactCommon.MutationResult<DeleteGuildPositionMutation>;
export type DeleteGuildPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteGuildPositionMutation,
  DeleteGuildPositionMutationVariables
>;
