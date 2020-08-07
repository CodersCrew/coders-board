import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type GuildPositionsQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type GuildPositionsQuery = { __typename?: 'Query' } & {
  guildPositions: Array<
    { __typename?: 'GuildPosition' } & Pick<Types.GuildPosition, 'id' | 'from' | 'to' | 'notes' | 'kind'> & {
        member: { __typename?: 'GuildMember' } & Pick<Types.GuildMember, 'id'> & {
            user: { __typename?: 'User' } & Pick<Types.User, 'id' | 'fullName' | 'image'>;
            guild: { __typename?: 'Guild' } & Pick<Types.Guild, 'id'>;
          };
        clan?: Types.Maybe<{ __typename?: 'Clan' } & Pick<Types.Clan, 'id' | 'name'>>;
      }
  >;
};

export type CreateGuildPositionMutationVariables = Types.Exact<{
  data: Types.CreateGuildPositionInput;
}>;

export type CreateGuildPositionMutation = { __typename?: 'Mutation' } & {
  createGuildPosition: { __typename?: 'GuildPosition' } & Pick<Types.GuildPosition, 'id'>;
};

export type UpdateGuildPositionMutationVariables = Types.Exact<{
  data: Types.UpdateGuildPositionInput;
}>;

export type UpdateGuildPositionMutation = { __typename?: 'Mutation' } & {
  updateGuildPosition: { __typename?: 'GuildPosition' } & Pick<Types.GuildPosition, 'id'>;
};

export type DeleteGuildPositionMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  guildId: Types.Scalars['ID'];
}>;

export type DeleteGuildPositionMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteGuildPosition'>;

export const GuildPositionsDocument = gql`
  query guildPositions($guildId: ID!) {
    guildPositions(guildId: $guildId) {
      id
      from
      to
      notes
      kind
      member {
        id
        user {
          id
          fullName
          image
        }
        guild {
          id
        }
      }
      clan {
        id
        name
      }
    }
  }
`;

/**
 * __useGuildPositionsQuery__
 *
 * To run a query within a React component, call `useGuildPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildPositionsQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildPositionsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GuildPositionsQuery, GuildPositionsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GuildPositionsQuery, GuildPositionsQueryVariables>(
    GuildPositionsDocument,
    baseOptions,
  );
}
export function useGuildPositionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GuildPositionsQuery, GuildPositionsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GuildPositionsQuery, GuildPositionsQueryVariables>(
    GuildPositionsDocument,
    baseOptions,
  );
}
export type GuildPositionsQueryHookResult = ReturnType<typeof useGuildPositionsQuery>;
export type GuildPositionsLazyQueryHookResult = ReturnType<typeof useGuildPositionsLazyQuery>;
export type GuildPositionsQueryResult = ApolloReactCommon.QueryResult<
  GuildPositionsQuery,
  GuildPositionsQueryVariables
>;
export const CreateGuildPositionDocument = gql`
  mutation createGuildPosition($data: CreateGuildPositionInput!) {
    createGuildPosition(data: $data) {
      id
    }
  }
`;
export type CreateGuildPositionMutationFn = ApolloReactCommon.MutationFunction<
  CreateGuildPositionMutation,
  CreateGuildPositionMutationVariables
>;

/**
 * __useCreateGuildPositionMutation__
 *
 * To run a mutation, you first call `useCreateGuildPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuildPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuildPositionMutation, { data, loading, error }] = useCreateGuildPositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGuildPositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGuildPositionMutation, CreateGuildPositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateGuildPositionMutation, CreateGuildPositionMutationVariables>(
    CreateGuildPositionDocument,
    baseOptions,
  );
}
export type CreateGuildPositionMutationHookResult = ReturnType<typeof useCreateGuildPositionMutation>;
export type CreateGuildPositionMutationResult = ApolloReactCommon.MutationResult<CreateGuildPositionMutation>;
export type CreateGuildPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateGuildPositionMutation,
  CreateGuildPositionMutationVariables
>;
export const UpdateGuildPositionDocument = gql`
  mutation updateGuildPosition($data: UpdateGuildPositionInput!) {
    updateGuildPosition(data: $data) {
      id
    }
  }
`;
export type UpdateGuildPositionMutationFn = ApolloReactCommon.MutationFunction<
  UpdateGuildPositionMutation,
  UpdateGuildPositionMutationVariables
>;

/**
 * __useUpdateGuildPositionMutation__
 *
 * To run a mutation, you first call `useUpdateGuildPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGuildPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGuildPositionMutation, { data, loading, error }] = useUpdateGuildPositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateGuildPositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateGuildPositionMutation, UpdateGuildPositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateGuildPositionMutation, UpdateGuildPositionMutationVariables>(
    UpdateGuildPositionDocument,
    baseOptions,
  );
}
export type UpdateGuildPositionMutationHookResult = ReturnType<typeof useUpdateGuildPositionMutation>;
export type UpdateGuildPositionMutationResult = ApolloReactCommon.MutationResult<UpdateGuildPositionMutation>;
export type UpdateGuildPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateGuildPositionMutation,
  UpdateGuildPositionMutationVariables
>;
export const DeleteGuildPositionDocument = gql`
  mutation deleteGuildPosition($id: ID!, $guildId: ID!) {
    deleteGuildPosition(id: $id, guildId: $guildId)
  }
`;
export type DeleteGuildPositionMutationFn = ApolloReactCommon.MutationFunction<
  DeleteGuildPositionMutation,
  DeleteGuildPositionMutationVariables
>;

/**
 * __useDeleteGuildPositionMutation__
 *
 * To run a mutation, you first call `useDeleteGuildPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGuildPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGuildPositionMutation, { data, loading, error }] = useDeleteGuildPositionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useDeleteGuildPositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteGuildPositionMutation, DeleteGuildPositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteGuildPositionMutation, DeleteGuildPositionMutationVariables>(
    DeleteGuildPositionDocument,
    baseOptions,
  );
}
export type DeleteGuildPositionMutationHookResult = ReturnType<typeof useDeleteGuildPositionMutation>;
export type DeleteGuildPositionMutationResult = ApolloReactCommon.MutationResult<DeleteGuildPositionMutation>;
export type DeleteGuildPositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteGuildPositionMutation,
  DeleteGuildPositionMutationVariables
>;
