import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type UsersQueryVariables = Types.Exact<{
  search?: Types.Maybe<Types.Scalars['String']>;
  role?: Types.Maybe<Types.UserRole>;
}>;

export type UsersQuery = {
  users: Array<
    Pick<
      Types.User,
      'id' | 'thumbnail' | 'firstName' | 'lastName' | 'fullName' | 'primaryEmail' | 'recoveryEmail' | 'role' | 'slackId'
    >
  >;
};

export type BaseUserInfoQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type BaseUserInfoQuery = {
  user: Pick<Types.User, 'id' | 'thumbnail' | 'fullName' | 'primaryEmail' | 'phone'> & {
    guilds: Array<Pick<Types.GuildMember, 'id'> & { guild: Pick<Types.Guild, 'id' | 'name' | 'image'> }>;
    squads: Array<Pick<Types.SquadMember, 'id'> & { squad: Pick<Types.Squad, 'id' | 'name' | 'image'> }>;
  };
};

export type UserActivityQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type UserActivityQuery = {
  user: Pick<Types.User, 'id'> & {
    guilds: Array<
      Pick<Types.GuildMember, 'id'> & {
        guild: Pick<Types.Guild, 'id' | 'name' | 'image'>;
        positions: Array<
          Pick<Types.GuildPosition, 'id' | 'from' | 'to' | 'notes' | 'kind'> & {
            clan?: Types.Maybe<Pick<Types.Clan, 'id' | 'name'>>;
          }
        >;
      }
    >;
    squads: Array<
      Pick<Types.SquadMember, 'id'> & {
        squad: Pick<Types.Squad, 'id' | 'name' | 'image'>;
        positions: Array<
          Pick<Types.SquadPosition, 'id' | 'from' | 'to' | 'notes'> & {
            position: Pick<Types.Position, 'id' | 'name'>;
            chapter?: Types.Maybe<Pick<Types.Chapter, 'id' | 'name'>>;
          }
        >;
      }
    >;
  };
};

export type SimpleUsersQueryVariables = Types.Exact<{
  ids?: Types.Maybe<Array<Types.Scalars['ID']>>;
}>;

export type SimpleUsersQuery = { users: Array<Pick<Types.User, 'id' | 'fullName'>> };

export type CreateUserMutationVariables = Types.Exact<{
  data: Types.CreateUserInput;
}>;

export type CreateUserMutation = { createUser: Pick<Types.User, 'id'> };

export type UpdateUserMutationVariables = Types.Exact<{
  data: Types.UpdateUserInput;
}>;

export type UpdateUserMutation = { updateUser: Pick<Types.User, 'id'> };

export type DeleteUserMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeleteUserMutation = Pick<Types.Mutation, 'deleteUser'>;

export const UsersDocument = gql`
  query users($search: String, $role: UserRole) {
    users(search: $search, role: $role) {
      id
      thumbnail
      firstName
      lastName
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
export const BaseUserInfoDocument = gql`
  query baseUserInfo($id: ID!) {
    user(id: $id) {
      id
      thumbnail
      fullName
      primaryEmail
      phone
      guilds {
        id
        guild {
          id
          name
          image
        }
      }
      squads {
        id
        squad {
          id
          name
          image
        }
      }
    }
  }
`;

/**
 * __useBaseUserInfoQuery__
 *
 * To run a query within a React component, call `useBaseUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useBaseUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBaseUserInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBaseUserInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<BaseUserInfoQuery, BaseUserInfoQueryVariables>,
) {
  return Apollo.useQuery<BaseUserInfoQuery, BaseUserInfoQueryVariables>(BaseUserInfoDocument, baseOptions);
}
export function useBaseUserInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BaseUserInfoQuery, BaseUserInfoQueryVariables>,
) {
  return Apollo.useLazyQuery<BaseUserInfoQuery, BaseUserInfoQueryVariables>(BaseUserInfoDocument, baseOptions);
}
export type BaseUserInfoQueryHookResult = ReturnType<typeof useBaseUserInfoQuery>;
export type BaseUserInfoLazyQueryHookResult = ReturnType<typeof useBaseUserInfoLazyQuery>;
export type BaseUserInfoQueryResult = Apollo.QueryResult<BaseUserInfoQuery, BaseUserInfoQueryVariables>;
export const UserActivityDocument = gql`
  query userActivity($id: ID!) {
    user(id: $id) {
      id
      guilds {
        id
        guild {
          id
          name
          image
        }
        positions {
          id
          from
          to
          notes
          kind
          clan {
            id
            name
          }
        }
      }
      squads {
        id
        squad {
          id
          name
          image
        }
        positions {
          id
          from
          to
          notes
          position {
            id
            name
          }
          chapter {
            id
            name
          }
        }
      }
    }
  }
`;

/**
 * __useUserActivityQuery__
 *
 * To run a query within a React component, call `useUserActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserActivityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserActivityQuery(
  baseOptions?: Apollo.QueryHookOptions<UserActivityQuery, UserActivityQueryVariables>,
) {
  return Apollo.useQuery<UserActivityQuery, UserActivityQueryVariables>(UserActivityDocument, baseOptions);
}
export function useUserActivityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserActivityQuery, UserActivityQueryVariables>,
) {
  return Apollo.useLazyQuery<UserActivityQuery, UserActivityQueryVariables>(UserActivityDocument, baseOptions);
}
export type UserActivityQueryHookResult = ReturnType<typeof useUserActivityQuery>;
export type UserActivityLazyQueryHookResult = ReturnType<typeof useUserActivityLazyQuery>;
export type UserActivityQueryResult = Apollo.QueryResult<UserActivityQuery, UserActivityQueryVariables>;
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
export const UpdateUserDocument = gql`
  mutation updateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>,
) {
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
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
