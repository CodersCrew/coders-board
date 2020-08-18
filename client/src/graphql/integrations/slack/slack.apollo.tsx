import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type SlackUsersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type SlackUsersQuery = { __typename?: 'Query' } & {
  slackUsers: Array<
    { __typename?: 'SlackUser' } & Pick<Types.SlackUser, 'id' | 'fullName' | 'primaryEmail' | 'image' | 'thumbnail'>
  >;
};

export type SyncSlackUserMutationVariables = Types.Exact<{
  data: Types.SyncSlackUserInput;
}>;

export type SyncSlackUserMutation = { __typename?: 'Mutation' } & {
  syncSlackUser: { __typename?: 'User' } & Pick<Types.User, 'id'>;
};

export const SlackUsersDocument = gql`
  query slackUsers {
    slackUsers {
      id
      fullName
      primaryEmail
      image
      thumbnail
    }
  }
`;

/**
 * __useSlackUsersQuery__
 *
 * To run a query within a React component, call `useSlackUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlackUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlackUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSlackUsersQuery(baseOptions?: Apollo.QueryHookOptions<SlackUsersQuery, SlackUsersQueryVariables>) {
  return Apollo.useQuery<SlackUsersQuery, SlackUsersQueryVariables>(SlackUsersDocument, baseOptions);
}
export function useSlackUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SlackUsersQuery, SlackUsersQueryVariables>,
) {
  return Apollo.useLazyQuery<SlackUsersQuery, SlackUsersQueryVariables>(SlackUsersDocument, baseOptions);
}
export type SlackUsersQueryHookResult = ReturnType<typeof useSlackUsersQuery>;
export type SlackUsersLazyQueryHookResult = ReturnType<typeof useSlackUsersLazyQuery>;
export type SlackUsersQueryResult = Apollo.QueryResult<SlackUsersQuery, SlackUsersQueryVariables>;
export const SyncSlackUserDocument = gql`
  mutation syncSlackUser($data: SyncSlackUserInput!) {
    syncSlackUser(data: $data) {
      id
    }
  }
`;
export type SyncSlackUserMutationFn = Apollo.MutationFunction<SyncSlackUserMutation, SyncSlackUserMutationVariables>;

/**
 * __useSyncSlackUserMutation__
 *
 * To run a mutation, you first call `useSyncSlackUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncSlackUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncSlackUserMutation, { data, loading, error }] = useSyncSlackUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSyncSlackUserMutation(
  baseOptions?: Apollo.MutationHookOptions<SyncSlackUserMutation, SyncSlackUserMutationVariables>,
) {
  return Apollo.useMutation<SyncSlackUserMutation, SyncSlackUserMutationVariables>(SyncSlackUserDocument, baseOptions);
}
export type SyncSlackUserMutationHookResult = ReturnType<typeof useSyncSlackUserMutation>;
export type SyncSlackUserMutationResult = Apollo.MutationResult<SyncSlackUserMutation>;
export type SyncSlackUserMutationOptions = Apollo.BaseMutationOptions<
  SyncSlackUserMutation,
  SyncSlackUserMutationVariables
>;
