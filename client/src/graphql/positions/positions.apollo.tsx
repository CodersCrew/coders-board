import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../typings/graphql';

export type PositionsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PositionsQuery = { __typename?: 'Query' } & {
  positions: Array<
    { __typename?: 'Position' } & Pick<Types.Position, 'id' | 'name' | 'description' | 'image'> & {
        clan?: Types.Maybe<{ __typename?: 'Clan' } & Pick<Types.Clan, 'id' | 'name' | 'image'>>;
        guild?: Types.Maybe<{ __typename?: 'Guild' } & Pick<Types.Guild, 'id' | 'name' | 'image'>>;
      }
  >;
};

export type CreatePositionMutationVariables = Types.Exact<{
  data: Types.CreatePositionInput;
}>;

export type CreatePositionMutation = { __typename?: 'Mutation' } & {
  createPosition: { __typename?: 'Position' } & Pick<Types.Position, 'id'>;
};

export type UpdatePositionMutationVariables = Types.Exact<{
  data: Types.UpdatePositionInput;
}>;

export type UpdatePositionMutation = { __typename?: 'Mutation' } & {
  updatePosition: { __typename?: 'Position' } & Pick<Types.Position, 'id'>;
};

export type DeletePositionMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeletePositionMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deletePosition'>;

export const PositionsDocument = gql`
  query positions {
    positions {
      id
      name
      description
      image
      clan {
        id
        name
        image
      }
      guild {
        id
        name
        image
      }
    }
  }
`;

/**
 * __usePositionsQuery__
 *
 * To run a query within a React component, call `usePositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePositionsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<PositionsQuery, PositionsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, baseOptions);
}
export function usePositionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PositionsQuery, PositionsQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, baseOptions);
}
export type PositionsQueryHookResult = ReturnType<typeof usePositionsQuery>;
export type PositionsLazyQueryHookResult = ReturnType<typeof usePositionsLazyQuery>;
export type PositionsQueryResult = ApolloReactCommon.QueryResult<PositionsQuery, PositionsQueryVariables>;
export const CreatePositionDocument = gql`
  mutation createPosition($data: CreatePositionInput!) {
    createPosition(data: $data) {
      id
    }
  }
`;
export type CreatePositionMutationFn = ApolloReactCommon.MutationFunction<
  CreatePositionMutation,
  CreatePositionMutationVariables
>;

/**
 * __useCreatePositionMutation__
 *
 * To run a mutation, you first call `useCreatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPositionMutation, { data, loading, error }] = useCreatePositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePositionMutation, CreatePositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreatePositionMutation, CreatePositionMutationVariables>(
    CreatePositionDocument,
    baseOptions,
  );
}
export type CreatePositionMutationHookResult = ReturnType<typeof useCreatePositionMutation>;
export type CreatePositionMutationResult = ApolloReactCommon.MutationResult<CreatePositionMutation>;
export type CreatePositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePositionMutation,
  CreatePositionMutationVariables
>;
export const UpdatePositionDocument = gql`
  mutation updatePosition($data: UpdatePositionInput!) {
    updatePosition(data: $data) {
      id
    }
  }
`;
export type UpdatePositionMutationFn = ApolloReactCommon.MutationFunction<
  UpdatePositionMutation,
  UpdatePositionMutationVariables
>;

/**
 * __useUpdatePositionMutation__
 *
 * To run a mutation, you first call `useUpdatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePositionMutation, { data, loading, error }] = useUpdatePositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePositionMutation, UpdatePositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdatePositionMutation, UpdatePositionMutationVariables>(
    UpdatePositionDocument,
    baseOptions,
  );
}
export type UpdatePositionMutationHookResult = ReturnType<typeof useUpdatePositionMutation>;
export type UpdatePositionMutationResult = ApolloReactCommon.MutationResult<UpdatePositionMutation>;
export type UpdatePositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePositionMutation,
  UpdatePositionMutationVariables
>;
export const DeletePositionDocument = gql`
  mutation deletePosition($id: ID!) {
    deletePosition(id: $id)
  }
`;
export type DeletePositionMutationFn = ApolloReactCommon.MutationFunction<
  DeletePositionMutation,
  DeletePositionMutationVariables
>;

/**
 * __useDeletePositionMutation__
 *
 * To run a mutation, you first call `useDeletePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePositionMutation, { data, loading, error }] = useDeletePositionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePositionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePositionMutation, DeletePositionMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeletePositionMutation, DeletePositionMutationVariables>(
    DeletePositionDocument,
    baseOptions,
  );
}
export type DeletePositionMutationHookResult = ReturnType<typeof useDeletePositionMutation>;
export type DeletePositionMutationResult = ApolloReactCommon.MutationResult<DeletePositionMutation>;
export type DeletePositionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeletePositionMutation,
  DeletePositionMutationVariables
>;