import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type InitialSyncSlackUserMutationVariables = Types.Exact<{
  data: Types.InitialSyncSlackUserInput;
}>;

export type InitialSyncSlackUserMutation = { initialSyncSlackUser: Pick<Types.User, 'id'> };

export const InitialSyncSlackUserDocument = gql`
  mutation initialSyncSlackUser($data: InitialSyncSlackUserInput!) {
    initialSyncSlackUser(data: $data) {
      id
    }
  }
`;
export type InitialSyncSlackUserMutationFn = Apollo.MutationFunction<
  InitialSyncSlackUserMutation,
  InitialSyncSlackUserMutationVariables
>;

/**
 * __useInitialSyncSlackUserMutation__
 *
 * To run a mutation, you first call `useInitialSyncSlackUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitialSyncSlackUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initialSyncSlackUserMutation, { data, loading, error }] = useInitialSyncSlackUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useInitialSyncSlackUserMutation(
  baseOptions?: Apollo.MutationHookOptions<InitialSyncSlackUserMutation, InitialSyncSlackUserMutationVariables>,
) {
  return Apollo.useMutation<InitialSyncSlackUserMutation, InitialSyncSlackUserMutationVariables>(
    InitialSyncSlackUserDocument,
    baseOptions,
  );
}
export type InitialSyncSlackUserMutationHookResult = ReturnType<typeof useInitialSyncSlackUserMutation>;
export type InitialSyncSlackUserMutationResult = Apollo.MutationResult<InitialSyncSlackUserMutation>;
export type InitialSyncSlackUserMutationOptions = Apollo.BaseMutationOptions<
  InitialSyncSlackUserMutation,
  InitialSyncSlackUserMutationVariables
>;
