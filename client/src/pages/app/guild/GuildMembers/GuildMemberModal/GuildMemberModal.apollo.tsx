import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../../typings/graphql';

export type CreateGuildMemberMutationVariables = Types.Exact<{
  data: Types.CreateGuildMemberInput;
}>;

export type CreateGuildMemberMutation = { __typename?: 'Mutation' } & {
  createGuildMember: { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id'>;
};

export type UpdateGuildMemberMutationVariables = Types.Exact<{
  data: Types.UpdateGuildMemberInput;
}>;

export type UpdateGuildMemberMutation = { __typename?: 'Mutation' } & {
  updateGuildMember: { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id'>;
};

export const CreateGuildMemberDocument = gql`
  mutation createGuildMember($data: CreateGuildMemberInput!) {
    createGuildMember(data: $data) {
      id
    }
  }
`;
export type CreateGuildMemberMutationFn = ApolloReactCommon.MutationFunction<
  CreateGuildMemberMutation,
  CreateGuildMemberMutationVariables
>;

/**
 * __useCreateGuildMemberMutation__
 *
 * To run a mutation, you first call `useCreateGuildMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuildMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuildMemberMutation, { data, loading, error }] = useCreateGuildMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGuildMemberMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGuildMemberMutation, CreateGuildMemberMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateGuildMemberMutation, CreateGuildMemberMutationVariables>(
    CreateGuildMemberDocument,
    baseOptions,
  );
}
export type CreateGuildMemberMutationHookResult = ReturnType<typeof useCreateGuildMemberMutation>;
export type CreateGuildMemberMutationResult = ApolloReactCommon.MutationResult<CreateGuildMemberMutation>;
export type CreateGuildMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateGuildMemberMutation,
  CreateGuildMemberMutationVariables
>;
export const UpdateGuildMemberDocument = gql`
  mutation updateGuildMember($data: UpdateGuildMemberInput!) {
    updateGuildMember(data: $data) {
      id
    }
  }
`;
export type UpdateGuildMemberMutationFn = ApolloReactCommon.MutationFunction<
  UpdateGuildMemberMutation,
  UpdateGuildMemberMutationVariables
>;

/**
 * __useUpdateGuildMemberMutation__
 *
 * To run a mutation, you first call `useUpdateGuildMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGuildMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGuildMemberMutation, { data, loading, error }] = useUpdateGuildMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateGuildMemberMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateGuildMemberMutation, UpdateGuildMemberMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateGuildMemberMutation, UpdateGuildMemberMutationVariables>(
    UpdateGuildMemberDocument,
    baseOptions,
  );
}
export type UpdateGuildMemberMutationHookResult = ReturnType<typeof useUpdateGuildMemberMutation>;
export type UpdateGuildMemberMutationResult = ApolloReactCommon.MutationResult<UpdateGuildMemberMutation>;
export type UpdateGuildMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateGuildMemberMutation,
  UpdateGuildMemberMutationVariables
>;
