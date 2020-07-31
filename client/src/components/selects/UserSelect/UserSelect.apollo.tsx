import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type UserSelectUsersQueryVariables = Types.Exact<{
  ids?: Types.Maybe<Array<Types.Scalars['ID']>>;
}>;

export type UserSelectUsersQuery = { __typename?: 'Query' } & {
  users: Array<{ __typename?: 'User' } & Pick<Types.User, 'id' | 'firstName' | 'lastName'>>;
};

export const UserSelectUsersDocument = gql`
  query userSelectUsers($ids: [ID!]) {
    users(ids: $ids) {
      id
      firstName
      lastName
    }
  }
`;

/**
 * __useUserSelectUsersQuery__
 *
 * To run a query within a React component, call `useUserSelectUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSelectUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSelectUsersQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useUserSelectUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserSelectUsersQuery, UserSelectUsersQueryVariables>,
) {
  return ApolloReactHooks.useQuery<UserSelectUsersQuery, UserSelectUsersQueryVariables>(
    UserSelectUsersDocument,
    baseOptions,
  );
}
export function useUserSelectUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserSelectUsersQuery, UserSelectUsersQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<UserSelectUsersQuery, UserSelectUsersQueryVariables>(
    UserSelectUsersDocument,
    baseOptions,
  );
}
export type UserSelectUsersQueryHookResult = ReturnType<typeof useUserSelectUsersQuery>;
export type UserSelectUsersLazyQueryHookResult = ReturnType<typeof useUserSelectUsersLazyQuery>;
export type UserSelectUsersQueryResult = ApolloReactCommon.QueryResult<
  UserSelectUsersQuery,
  UserSelectUsersQueryVariables
>;
