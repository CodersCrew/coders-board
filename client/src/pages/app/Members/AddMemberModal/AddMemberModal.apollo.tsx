import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../typings/graphql';

export type CreateMemberMutationVariables = Types.Exact<{
  data: Types.CreateUserInput;
}>;

export type CreateMemberMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'User' } & Pick<Types.User, 'id'>;
};

export const CreateMemberDocument = gql`
  mutation createMember($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;
export type CreateMemberMutationFn = ApolloReactCommon.MutationFunction<
  CreateMemberMutation,
  CreateMemberMutationVariables
>;

/**
 * __useCreateMemberMutation__
 *
 * To run a mutation, you first call `useCreateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemberMutation, { data, loading, error }] = useCreateMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMemberMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMemberMutation, CreateMemberMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateMemberMutation, CreateMemberMutationVariables>(
    CreateMemberDocument,
    baseOptions,
  );
}
export type CreateMemberMutationHookResult = ReturnType<typeof useCreateMemberMutation>;
export type CreateMemberMutationResult = ApolloReactCommon.MutationResult<CreateMemberMutation>;
export type CreateMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateMemberMutation,
  CreateMemberMutationVariables
>;
