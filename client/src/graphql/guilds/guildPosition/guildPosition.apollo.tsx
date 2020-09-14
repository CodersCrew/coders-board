import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type GuildPositionsQueryVariables = Types.Exact<{
  guildId: Types.Scalars['ID'];
}>;

export type GuildPositionsQuery = {
  guildPositions: (Pick<Types.GuildPosition, 'id' | 'from' | 'to' | 'notes'> & {
    position: Pick<Types.Position, 'id' | 'name'>;
    member: Pick<Types.GuildMember, 'id'> & {
      user: Pick<Types.User, 'id' | 'fullName' | 'image'>;
      guild: Pick<Types.Guild, 'id'>;
    };
    clan?: Types.Maybe<Pick<Types.Clan, 'id' | 'name'>>;
  })[];
};

export type CreateGuildPositionMutationVariables = Types.Exact<{
  data: Types.CreateGuildPositionInput;
}>;

export type CreateGuildPositionMutation = { createGuildPosition: Pick<Types.GuildPosition, 'id'> };

export type UpdateGuildPositionMutationVariables = Types.Exact<{
  data: Types.UpdateGuildPositionInput;
}>;

export type UpdateGuildPositionMutation = { updateGuildPosition: Pick<Types.GuildPosition, 'id'> };

export type DeleteGuildPositionMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  guildId: Types.Scalars['ID'];
}>;

export type DeleteGuildPositionMutation = Pick<Types.Mutation, 'deleteGuildPosition'>;

export const GuildPositionsDocument = gql`
  query guildPositions($guildId: ID!) {
    guildPositions(guildId: $guildId) {
      id
      from
      to
      notes
      position {
        id
        name
      }
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
  baseOptions?: Apollo.QueryHookOptions<GuildPositionsQuery, GuildPositionsQueryVariables>,
) {
  return Apollo.useQuery<GuildPositionsQuery, GuildPositionsQueryVariables>(GuildPositionsDocument, baseOptions);
}
export function useGuildPositionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GuildPositionsQuery, GuildPositionsQueryVariables>,
) {
  return Apollo.useLazyQuery<GuildPositionsQuery, GuildPositionsQueryVariables>(GuildPositionsDocument, baseOptions);
}
export type GuildPositionsQueryHookResult = ReturnType<typeof useGuildPositionsQuery>;
export type GuildPositionsLazyQueryHookResult = ReturnType<typeof useGuildPositionsLazyQuery>;
export type GuildPositionsQueryResult = Apollo.QueryResult<GuildPositionsQuery, GuildPositionsQueryVariables>;
export const CreateGuildPositionDocument = gql`
  mutation createGuildPosition($data: CreateGuildPositionInput!) {
    createGuildPosition(data: $data) {
      id
    }
  }
`;
export type CreateGuildPositionMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<CreateGuildPositionMutation, CreateGuildPositionMutationVariables>,
) {
  return Apollo.useMutation<CreateGuildPositionMutation, CreateGuildPositionMutationVariables>(
    CreateGuildPositionDocument,
    baseOptions,
  );
}
export type CreateGuildPositionMutationHookResult = ReturnType<typeof useCreateGuildPositionMutation>;
export type CreateGuildPositionMutationResult = Apollo.MutationResult<CreateGuildPositionMutation>;
export type CreateGuildPositionMutationOptions = Apollo.BaseMutationOptions<
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
export type UpdateGuildPositionMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<UpdateGuildPositionMutation, UpdateGuildPositionMutationVariables>,
) {
  return Apollo.useMutation<UpdateGuildPositionMutation, UpdateGuildPositionMutationVariables>(
    UpdateGuildPositionDocument,
    baseOptions,
  );
}
export type UpdateGuildPositionMutationHookResult = ReturnType<typeof useUpdateGuildPositionMutation>;
export type UpdateGuildPositionMutationResult = Apollo.MutationResult<UpdateGuildPositionMutation>;
export type UpdateGuildPositionMutationOptions = Apollo.BaseMutationOptions<
  UpdateGuildPositionMutation,
  UpdateGuildPositionMutationVariables
>;
export const DeleteGuildPositionDocument = gql`
  mutation deleteGuildPosition($id: ID!, $guildId: ID!) {
    deleteGuildPosition(id: $id, guildId: $guildId)
  }
`;
export type DeleteGuildPositionMutationFn = Apollo.MutationFunction<
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
  baseOptions?: Apollo.MutationHookOptions<DeleteGuildPositionMutation, DeleteGuildPositionMutationVariables>,
) {
  return Apollo.useMutation<DeleteGuildPositionMutation, DeleteGuildPositionMutationVariables>(
    DeleteGuildPositionDocument,
    baseOptions,
  );
}
export type DeleteGuildPositionMutationHookResult = ReturnType<typeof useDeleteGuildPositionMutation>;
export type DeleteGuildPositionMutationResult = Apollo.MutationResult<DeleteGuildPositionMutation>;
export type DeleteGuildPositionMutationOptions = Apollo.BaseMutationOptions<
  DeleteGuildPositionMutation,
  DeleteGuildPositionMutationVariables
>;
