import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type MembersQueryVariables = Types.Exact<{
  search?: Types.Maybe<Types.Scalars['String']>;
  role?: Types.Maybe<Types.UserRole>;
}>;

export type MembersQuery = { __typename?: 'Query' } & {
  users: Array<
    { __typename?: 'User' } & Pick<
      Types.User,
      'id' | 'image' | 'firstName' | 'lastName' | 'primaryEmail' | 'recoveryEmail' | 'role'
    >
  >;
};

export const MembersDocument = gql`
  query members($search: String, $role: UserRole) {
    users(search: $search, role: $role) {
      id
      image
      firstName
      lastName
      primaryEmail
      recoveryEmail
      role
    }
  }
`;

/**
 * __useMembersQuery__
 *
 * To run a query within a React component, call `useMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembersQuery({
 *   variables: {
 *      search: // value for 'search'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useMembersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MembersQuery, MembersQueryVariables>) {
  return ApolloReactHooks.useQuery<MembersQuery, MembersQueryVariables>(MembersDocument, baseOptions);
}
export function useMembersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MembersQuery, MembersQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<MembersQuery, MembersQueryVariables>(MembersDocument, baseOptions);
}
export type MembersQueryHookResult = ReturnType<typeof useMembersQuery>;
export type MembersLazyQueryHookResult = ReturnType<typeof useMembersLazyQuery>;
export type MembersQueryResult = ApolloReactCommon.QueryResult<MembersQuery, MembersQueryVariables>;
