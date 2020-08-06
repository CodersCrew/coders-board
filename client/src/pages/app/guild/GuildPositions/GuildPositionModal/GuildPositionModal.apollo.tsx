import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../../../typings/graphql';

export type CreateGuildPositionMutationVariables = Types.Exact<{
  data: Types.CreateGuildPositionInput;
}>;

export type CreateGuildPositionMutation = { __typename?: 'Mutation' } & {
  createGuildPosition: { __typename?: 'GuildPosition' } & Pick<Types.GuildPosition, 'id'>;
};

export type UpdateGuildPositionMutationVariables = Types.Exact<{
  data: Types.UpdateGuildPositionInput;
}>;

export type UpdateGuildPositionMutation = { __typename?: 'Mutation' } & {
  updateGuildPosition: { __typename?: 'GuildPosition' } & Pick<Types.GuildPosition, 'id'>;
};

export const CreateGuildPositionDocument = gql`
  mutation createGuildPosition($data: CreateGuildPositionInput!) {
    createGuildPosition(data: $data) {
      id
    }
  }
`;
export type CreateGuildPositionMutationFn = ApolloReactCommon.MutationFunction<
  CreateGuildPositionMutation,
  CreateGuildPositionMutationVariables
>;

/**
 * __useCreateGuildPositionMutation__
 *
 * To run a mutation, you first call `useCreateGuildPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuildPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuildPositionMutation, { data, loading, error }] = useCreateGuildPositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGuildPositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGuildPositionMutation, CreateGuildPositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateGuildPositionMutation, CreateGuildPositionMutationVariables>(
    CreateGuildPositionDocument,
    baseOptions,
  );
}
export type CreateGuildPositionMutationHookResult = ReturnType<typeof useCreateGuildPositionMutation>;
export type CreateGuildPositionMutationResult = ApolloReactCommon.MutationResult<CreateGuildPositionMutation>;
export type CreateGuildPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateGuildPositionMutation,
  CreateGuildPositionMutationVariables
>;
export const UpdateGuildPositionDocument = gql`
  mutation updateGuildPosition($data: UpdateGuildPositionInput!) {
    updateGuildPosition(data: $data) {
      id
    }
  }
`;
export type UpdateGuildPositionMutationFn = ApolloReactCommon.MutationFunction<
  UpdateGuildPositionMutation,
  UpdateGuildPositionMutationVariables
>;

/**
 * __useUpdateGuildPositionMutation__
 *
 * To run a mutation, you first call `useUpdateGuildPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGuildPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGuildPositionMutation, { data, loading, error }] = useUpdateGuildPositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateGuildPositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateGuildPositionMutation, UpdateGuildPositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateGuildPositionMutation, UpdateGuildPositionMutationVariables>(
    UpdateGuildPositionDocument,
    baseOptions,
  );
}
export type UpdateGuildPositionMutationHookResult = ReturnType<typeof useUpdateGuildPositionMutation>;
export type UpdateGuildPositionMutationResult = ApolloReactCommon.MutationResult<UpdateGuildPositionMutation>;
export type UpdateGuildPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateGuildPositionMutation,
  UpdateGuildPositionMutationVariables
>;
