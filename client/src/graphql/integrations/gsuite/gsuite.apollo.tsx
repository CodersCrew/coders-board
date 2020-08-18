import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type GsuiteUsersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GsuiteUsersQuery = { __typename?: 'Query' } & {
  gsuiteUsers: Array<
    { __typename?: 'GsuiteUser' } & Pick<
      Types.GsuiteUser,
      'id' | 'firstName' | 'lastName' | 'primaryEmail' | 'recoveryEmail'
    >
  >;
};

export const GsuiteUsersDocument = gql`
  query gsuiteUsers {
    gsuiteUsers {
      id
      firstName
      lastName
      primaryEmail
      recoveryEmail
    }
  }
`;

/**
 * __useGsuiteUsersQuery__
 *
 * To run a query within a React component, call `useGsuiteUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGsuiteUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGsuiteUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGsuiteUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GsuiteUsersQuery, GsuiteUsersQueryVariables>,
) {
  return Apollo.useQuery<GsuiteUsersQuery, GsuiteUsersQueryVariables>(GsuiteUsersDocument, baseOptions);
}
export function useGsuiteUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GsuiteUsersQuery, GsuiteUsersQueryVariables>,
) {
  return Apollo.useLazyQuery<GsuiteUsersQuery, GsuiteUsersQueryVariables>(GsuiteUsersDocument, baseOptions);
}
export type GsuiteUsersQueryHookResult = ReturnType<typeof useGsuiteUsersQuery>;
export type GsuiteUsersLazyQueryHookResult = ReturnType<typeof useGsuiteUsersLazyQuery>;
export type GsuiteUsersQueryResult = Apollo.QueryResult<GsuiteUsersQuery, GsuiteUsersQueryVariables>;
