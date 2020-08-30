import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: Pick<Types.User, 'id' | 'thumbnail' | 'fullName' | 'role'> & {
    guilds: Array<Pick<Types.GuildMember, 'id' | 'role' | 'guildId'>>;
    squads: Array<Pick<Types.SquadMember, 'id' | 'role' | 'squadId'>>;
  };
};

export type SignOutMutationVariables = Types.Exact<{ [key: string]: never }>;

export type SignOutMutation = Pick<Types.Mutation, 'signOut'>;

export const MeDocument = gql`
  query me {
    me {
      id
      thumbnail
      fullName
      role
      guilds {
        id
        role
        guildId
      }
      squads {
        id
        role
        squadId
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SignOutDocument = gql`
  mutation signOut {
    signOut
  }
`;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

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
  baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>,
) {
  return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
