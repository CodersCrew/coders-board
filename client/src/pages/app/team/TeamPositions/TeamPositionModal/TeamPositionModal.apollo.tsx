import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../../typings/graphql';

export type CreateTeamPositionMutationVariables = Types.Exact<{
  data: Types.CreateMemberPositionInput;
}>;

export type CreateTeamPositionMutation = { __typename?: 'Mutation' } & {
  createMemberPosition: { __typename?: 'MemberPosition' } & Pick<Types.MemberPosition, 'id'>;
};

export type UpdateTeamPositionMutationVariables = Types.Exact<{
  data: Types.UpdateMemberPositionInput;
}>;

export type UpdateTeamPositionMutation = { __typename?: 'Mutation' } & {
  updateMemberPosition: { __typename?: 'MemberPosition' } & Pick<Types.MemberPosition, 'id'>;
};

export const CreateTeamPositionDocument = gql`
  mutation createTeamPosition($data: CreateMemberPositionInput!) {
    createMemberPosition(data: $data) {
      id
    }
  }
`;
export type CreateTeamPositionMutationFn = ApolloReactCommon.MutationFunction<
  CreateTeamPositionMutation,
  CreateTeamPositionMutationVariables
>;

/**
 * __useCreateTeamPositionMutation__
 *
 * To run a mutation, you first call `useCreateTeamPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamPositionMutation, { data, loading, error }] = useCreateTeamPositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTeamPositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTeamPositionMutation, CreateTeamPositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateTeamPositionMutation, CreateTeamPositionMutationVariables>(
    CreateTeamPositionDocument,
    baseOptions,
  );
}
export type CreateTeamPositionMutationHookResult = ReturnType<typeof useCreateTeamPositionMutation>;
export type CreateTeamPositionMutationResult = ApolloReactCommon.MutationResult<CreateTeamPositionMutation>;
export type CreateTeamPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTeamPositionMutation,
  CreateTeamPositionMutationVariables
>;
export const UpdateTeamPositionDocument = gql`
  mutation updateTeamPosition($data: UpdateMemberPositionInput!) {
    updateMemberPosition(data: $data) {
      id
    }
  }
`;
export type UpdateTeamPositionMutationFn = ApolloReactCommon.MutationFunction<
  UpdateTeamPositionMutation,
  UpdateTeamPositionMutationVariables
>;

/**
 * __useUpdateTeamPositionMutation__
 *
 * To run a mutation, you first call `useUpdateTeamPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamPositionMutation, { data, loading, error }] = useUpdateTeamPositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTeamPositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTeamPositionMutation, UpdateTeamPositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateTeamPositionMutation, UpdateTeamPositionMutationVariables>(
    UpdateTeamPositionDocument,
    baseOptions,
  );
}
export type UpdateTeamPositionMutationHookResult = ReturnType<typeof useUpdateTeamPositionMutation>;
export type UpdateTeamPositionMutationResult = ApolloReactCommon.MutationResult<UpdateTeamPositionMutation>;
export type UpdateTeamPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateTeamPositionMutation,
  UpdateTeamPositionMutationVariables
>;
