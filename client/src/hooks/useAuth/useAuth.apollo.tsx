import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../typings/graphql';

export type AuthMeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type AuthMeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<Types.User, 'id' | 'image' | 'firstName' | 'lastName' | 'role'>;
};

export type SignOutMutationVariables = Types.Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'signOut'>;

export const AuthMeDocument = gql`
  query authMe {
    me {
      id
      image
      firstName
      lastName
      role
    }
  }
`;

/**
 * __useAuthMeQuery__
 *
 * To run a query within a React component, call `useAuthMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthMeQuery, AuthMeQueryVariables>) {
  return ApolloReactHooks.useQuery<AuthMeQuery, AuthMeQueryVariables>(AuthMeDocument, baseOptions);
}
export function useAuthMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthMeQuery, AuthMeQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<AuthMeQuery, AuthMeQueryVariables>(AuthMeDocument, baseOptions);
}
export type AuthMeQueryHookResult = ReturnType<typeof useAuthMeQuery>;
export type AuthMeLazyQueryHookResult = ReturnType<typeof useAuthMeLazyQuery>;
export type AuthMeQueryResult = ApolloReactCommon.QueryResult<AuthMeQuery, AuthMeQueryVariables>;
export const SignOutDocument = gql`
  mutation signOut {
    signOut
  }
`;
export type SignOutMutationFn = ApolloReactCommon.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignOutMutation, SignOutMutationVariables>,
) {
  return ApolloReactHooks.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
