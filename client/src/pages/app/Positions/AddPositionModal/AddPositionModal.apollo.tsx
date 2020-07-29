import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../typings/graphql';

export type CreatePositionMutationVariables = Types.Exact<{
  data: Types.CreatePositionInput;
}>;

export type CreatePositionMutation = { __typename?: 'Mutation' } & {
  createPosition: { __typename?: 'Position' } & Pick<Types.Position, 'id'>;
};

export const CreatePositionDocument = gql`
  mutation createPosition($data: CreatePositionInput!) {
    createPosition(data: $data) {
      id
    }
  }
`;
export type CreatePositionMutationFn = ApolloReactCommon.MutationFunction<
  CreatePositionMutation,
  CreatePositionMutationVariables
>;

/**
 * __useCreatePositionMutation__
 *
 * To run a mutation, you first call `useCreatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPositionMutation, { data, loading, error }] = useCreatePositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePositionMutation, CreatePositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreatePositionMutation, CreatePositionMutationVariables>(
    CreatePositionDocument,
    baseOptions,
  );
}
export type CreatePositionMutationHookResult = ReturnType<typeof useCreatePositionMutation>;
export type CreatePositionMutationResult = ApolloReactCommon.MutationResult<CreatePositionMutation>;
export type CreatePositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePositionMutation,
  CreatePositionMutationVariables
>;
