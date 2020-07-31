import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../typings/graphql';

export type DeletePositionMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeletePositionMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deletePosition'>;

export const DeletePositionDocument = gql`
  mutation deletePosition($id: ID!) {
    deletePosition(id: $id)
  }
`;
export type DeletePositionMutationFn = ApolloReactCommon.MutationFunction<
  DeletePositionMutation,
  DeletePositionMutationVariables
>;

/**
 * __useDeletePositionMutation__
 *
 * To run a mutation, you first call `useDeletePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePositionMutation, { data, loading, error }] = useDeletePositionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePositionMutation, DeletePositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeletePositionMutation, DeletePositionMutationVariables>(
    DeletePositionDocument,
    baseOptions,
  );
}
export type DeletePositionMutationHookResult = ReturnType<typeof useDeletePositionMutation>;
export type DeletePositionMutationResult = ApolloReactCommon.MutationResult<DeletePositionMutation>;
export type DeletePositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeletePositionMutation,
  DeletePositionMutationVariables
>;
