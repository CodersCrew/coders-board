import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type GuildMembersQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type GuildMembersQuery = { __typename?: 'Query' } & {
  guildMembers: Array<
    { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id' | 'role'> & {
        user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'fullName' | 'image'>;
        positions: Array<
          { __typename?: 'GuildPosition' } & Pick<Types.GuildPosition, 'id' | 'kind'> & {
              clan?: Types.Maybe<{ __typename?: 'Clan' } & Pick<Types.Clan, 'id' | 'name'>>;
            }
        >;
      }
  >;
};

export type GuildMembersIdsQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type GuildMembersIdsQuery = { __typename?: 'Query' } & {
  guildMembers: Array<
    { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id'> & {
        user: { __typename?: 'User' } & Pick<Types.User, 'id'>;
      }
  >;
};

export type CreateGuildMemberMutationVariables = Types.Exact<{
  data: Types.CreateGuildMemberInput;
}>;

export type CreateGuildMemberMutation = { __typename?: 'Mutation' } & {
  createGuildMember: { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id'>;
};

export type UpdateGuildMemberMutationVariables = Types.Exact<{
  data: Types.UpdateGuildMemberInput;
}>;

export type UpdateGuildMemberMutation = { __typename?: 'Mutation' } & {
  updateGuildMember: { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id'>;
};

export type DeleteGuildMemberMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  guildId: Types.Scalars['ID'];
}>;

export type DeleteGuildMemberMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteGuildMember'>;

export const GuildMembersDocument = gql`
  query guildMembers($guildId: ID!) {
    guildMembers(guildId: $guildId) {
      id
      role
      user {
        id
        fullName
        image
      }
      positions(active: true) {
        id
        kind
        clan {
          id
          name
        }
      }
    }
  }
`;

/**
 * __useGuildMembersQuery__
 *
 * To run a query within a React component, call `useGuildMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildMembersQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildMembersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GuildMembersQuery, GuildMembersQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GuildMembersQuery, GuildMembersQueryVariables>(GuildMembersDocument, baseOptions);
}
export function useGuildMembersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GuildMembersQuery, GuildMembersQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GuildMembersQuery, GuildMembersQueryVariables>(
    GuildMembersDocument,
    baseOptions,
  );
}
export type GuildMembersQueryHookResult = ReturnType<typeof useGuildMembersQuery>;
export type GuildMembersLazyQueryHookResult = ReturnType<typeof useGuildMembersLazyQuery>;
export type GuildMembersQueryResult = ApolloReactCommon.QueryResult<GuildMembersQuery, GuildMembersQueryVariables>;
export const GuildMembersIdsDocument = gql`
  query guildMembersIds($guildId: ID!) {
    guildMembers(guildId: $guildId) {
      id
      user {
        id
      }
    }
  }
`;

/**
 * __useGuildMembersIdsQuery__
 *
 * To run a query within a React component, call `useGuildMembersIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildMembersIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildMembersIdsQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildMembersIdsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>(
    GuildMembersIdsDocument,
    baseOptions,
  );
}
export function useGuildMembersIdsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GuildMembersIdsQuery, GuildMembersIdsQueryVariables>(
    GuildMembersIdsDocument,
    baseOptions,
  );
}
export type GuildMembersIdsQueryHookResult = ReturnType<typeof useGuildMembersIdsQuery>;
export type GuildMembersIdsLazyQueryHookResult = ReturnType<typeof useGuildMembersIdsLazyQuery>;
export type GuildMembersIdsQueryResult = ApolloReactCommon.QueryResult<
  GuildMembersIdsQuery,
  GuildMembersIdsQueryVariables
>;
export const CreateGuildMemberDocument = gql`
  mutation createGuildMember($data: CreateGuildMemberInput!) {
    createGuildMember(data: $data) {
      id
    }
  }
`;
export type CreateGuildMemberMutationFn = ApolloReactCommon.MutationFunction<
  CreateGuildMemberMutation,
  CreateGuildMemberMutationVariables
>;

/**
 * __useCreateGuildMemberMutation__
 *
 * To run a mutation, you first call `useCreateGuildMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuildMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuildMemberMutation, { data, loading, error }] = useCreateGuildMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGuildMemberMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGuildMemberMutation, CreateGuildMemberMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateGuildMemberMutation, CreateGuildMemberMutationVariables>(
    CreateGuildMemberDocument,
    baseOptions,
  );
}
export type CreateGuildMemberMutationHookResult = ReturnType<typeof useCreateGuildMemberMutation>;
export type CreateGuildMemberMutationResult = ApolloReactCommon.MutationResult<CreateGuildMemberMutation>;
export type CreateGuildMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateGuildMemberMutation,
  CreateGuildMemberMutationVariables
>;
export const UpdateGuildMemberDocument = gql`
  mutation updateGuildMember($data: UpdateGuildMemberInput!) {
    updateGuildMember(data: $data) {
      id
    }
  }
`;
export type UpdateGuildMemberMutationFn = ApolloReactCommon.MutationFunction<
  UpdateGuildMemberMutation,
  UpdateGuildMemberMutationVariables
>;

/**
 * __useUpdateGuildMemberMutation__
 *
 * To run a mutation, you first call `useUpdateGuildMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGuildMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGuildMemberMutation, { data, loading, error }] = useUpdateGuildMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateGuildMemberMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateGuildMemberMutation, UpdateGuildMemberMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateGuildMemberMutation, UpdateGuildMemberMutationVariables>(
    UpdateGuildMemberDocument,
    baseOptions,
  );
}
export type UpdateGuildMemberMutationHookResult = ReturnType<typeof useUpdateGuildMemberMutation>;
export type UpdateGuildMemberMutationResult = ApolloReactCommon.MutationResult<UpdateGuildMemberMutation>;
export type UpdateGuildMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateGuildMemberMutation,
  UpdateGuildMemberMutationVariables
>;
export const DeleteGuildMemberDocument = gql`
  mutation deleteGuildMember($id: ID!, $guildId: ID!) {
    deleteGuildMember(id: $id, guildId: $guildId)
  }
`;
export type DeleteGuildMemberMutationFn = ApolloReactCommon.MutationFunction<
  DeleteGuildMemberMutation,
  DeleteGuildMemberMutationVariables
>;

/**
 * __useDeleteGuildMemberMutation__
 *
 * To run a mutation, you first call `useDeleteGuildMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGuildMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGuildMemberMutation, { data, loading, error }] = useDeleteGuildMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useDeleteGuildMemberMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteGuildMemberMutation, DeleteGuildMemberMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteGuildMemberMutation, DeleteGuildMemberMutationVariables>(
    DeleteGuildMemberDocument,
    baseOptions,
  );
}
export type DeleteGuildMemberMutationHookResult = ReturnType<typeof useDeleteGuildMemberMutation>;
export type DeleteGuildMemberMutationResult = ApolloReactCommon.MutationResult<DeleteGuildMemberMutation>;
export type DeleteGuildMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteGuildMemberMutation,
  DeleteGuildMemberMutationVariables
>;
