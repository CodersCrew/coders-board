import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type UsersQueryVariables = Types.Exact<{
  search?: Types.Maybe<Types.Scalars['String']>;
  role?: Types.Maybe<Types.UserRole>;
}>;

export type UsersQuery = { __typename?: 'Query' } & {
  users: Array<
    { __typename?: 'User' } & Pick<
      Types.User,
      'id' | 'image' | 'thumbnail' | 'fullName' | 'primaryEmail' | 'recoveryEmail' | 'role' | 'slackId'
    >
  >;
};

export type SimpleUsersQueryVariables = Types.Exact<{
  ids?: Types.Maybe<Array<Types.Scalars['ID']>>;
}>;

export type SimpleUsersQuery = { __typename?: 'Query' } & {
  users: Array<{ __typename?: 'User' } & Pick<Types.User, 'id' | 'fullName'>>;
};

export type CreateUserMutationVariables = Types.Exact<{
  data: Types.CreateUserInput;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'User' } & Pick<Types.User, 'id'>;
};

export type DeleteUserMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeleteUserMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteUser'>;

export const UsersDocument = gql`
  query users($search: String, $role: UserRole) {
    users(search: $search, role: $role) {
      id
      image
      thumbnail
      fullName
      primaryEmail
      recoveryEmail
      role
      slackId
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      search: // value for 'search'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
}
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const SimpleUsersDocument = gql`
  query simpleUsers($ids: [ID!]) {
    users(ids: $ids) {
      id
      fullName
    }
  }
`;

/**
 * __useSimpleUsersQuery__
 *
 * To run a query within a React component, call `useSimpleUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleUsersQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useSimpleUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<SimpleUsersQuery, SimpleUsersQueryVariables>,
) {
  return Apollo.useQuery<SimpleUsersQuery, SimpleUsersQueryVariables>(SimpleUsersDocument, baseOptions);
}
export function useSimpleUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SimpleUsersQuery, SimpleUsersQueryVariables>,
) {
  return Apollo.useLazyQuery<SimpleUsersQuery, SimpleUsersQueryVariables>(SimpleUsersDocument, baseOptions);
}
export type SimpleUsersQueryHookResult = ReturnType<typeof useSimpleUsersQuery>;
export type SimpleUsersLazyQueryHookResult = ReturnType<typeof useSimpleUsersLazyQuery>;
export type SimpleUsersQueryResult = Apollo.QueryResult<SimpleUsersQuery, SimpleUsersQueryVariables>;
export const CreateUserDocument = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>,
) {
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>,
) {
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
