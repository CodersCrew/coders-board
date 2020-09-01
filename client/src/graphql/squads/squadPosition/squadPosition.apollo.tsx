import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type SquadPositionsQueryVariables = Types.Exact<{
  squadId: Types.Scalars['ID'];
}>;

export type SquadPositionsQuery = {
  squadPositions: Array<
    Pick<Types.SquadPosition, 'id' | 'from' | 'to' | 'notes'> & {
      position: Pick<Types.Position, 'id' | 'name'>;
      member: Pick<Types.SquadMember, 'id'> & {
        user: Pick<Types.User, 'id' | 'fullName' | 'image'>;
        squad: Pick<Types.Squad, 'id'>;
      };
      chapter?: Types.Maybe<Pick<Types.Chapter, 'id' | 'name'>>;
    }
  >;
};

export type CreateSquadPositionMutationVariables = Types.Exact<{
  data: Types.CreateSquadPositionInput;
}>;

export type CreateSquadPositionMutation = { createSquadPosition: Pick<Types.SquadPosition, 'id'> };

export type UpdateSquadPositionMutationVariables = Types.Exact<{
  data: Types.UpdateSquadPositionInput;
}>;

export type UpdateSquadPositionMutation = { updateSquadPosition: Pick<Types.SquadPosition, 'id'> };

export type DeleteSquadPositionMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  squadId: Types.Scalars['ID'];
}>;

export type DeleteSquadPositionMutation = Pick<Types.Mutation, 'deleteSquadPosition'>;

export const SquadPositionsDocument = gql`
  query squadPositions($squadId: ID!) {
    squadPositions(squadId: $squadId) {
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
        squad {
          id
        }
      }
      chapter {
        id
        name
      }
    }
  }
`;

/**
 * __useSquadPositionsQuery__
 *
 * To run a query within a React component, call `useSquadPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSquadPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSquadPositionsQuery({
 *   variables: {
 *      squadId: // value for 'squadId'
 *   },
 * });
 */
export function useSquadPositionsQuery(
  baseOptions?: Apollo.QueryHookOptions<SquadPositionsQuery, SquadPositionsQueryVariables>,
) {
  return Apollo.useQuery<SquadPositionsQuery, SquadPositionsQueryVariables>(SquadPositionsDocument, baseOptions);
}
export function useSquadPositionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SquadPositionsQuery, SquadPositionsQueryVariables>,
) {
  return Apollo.useLazyQuery<SquadPositionsQuery, SquadPositionsQueryVariables>(SquadPositionsDocument, baseOptions);
}
export type SquadPositionsQueryHookResult = ReturnType<typeof useSquadPositionsQuery>;
export type SquadPositionsLazyQueryHookResult = ReturnType<typeof useSquadPositionsLazyQuery>;
export type SquadPositionsQueryResult = Apollo.QueryResult<SquadPositionsQuery, SquadPositionsQueryVariables>;
export const CreateSquadPositionDocument = gql`
  mutation createSquadPosition($data: CreateSquadPositionInput!) {
    createSquadPosition(data: $data) {
      id
    }
  }
`;
export type CreateSquadPositionMutationFn = Apollo.MutationFunction<
  CreateSquadPositionMutation,
  CreateSquadPositionMutationVariables
>;

/**
 * __useCreateSquadPositionMutation__
 *
 * To run a mutation, you first call `useCreateSquadPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSquadPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSquadPositionMutation, { data, loading, error }] = useCreateSquadPositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSquadPositionMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateSquadPositionMutation, CreateSquadPositionMutationVariables>,
) {
  return Apollo.useMutation<CreateSquadPositionMutation, CreateSquadPositionMutationVariables>(
    CreateSquadPositionDocument,
    baseOptions,
  );
}
export type CreateSquadPositionMutationHookResult = ReturnType<typeof useCreateSquadPositionMutation>;
export type CreateSquadPositionMutationResult = Apollo.MutationResult<CreateSquadPositionMutation>;
export type CreateSquadPositionMutationOptions = Apollo.BaseMutationOptions<
  CreateSquadPositionMutation,
  CreateSquadPositionMutationVariables
>;
export const UpdateSquadPositionDocument = gql`
  mutation updateSquadPosition($data: UpdateSquadPositionInput!) {
    updateSquadPosition(data: $data) {
      id
    }
  }
`;
export type UpdateSquadPositionMutationFn = Apollo.MutationFunction<
  UpdateSquadPositionMutation,
  UpdateSquadPositionMutationVariables
>;

/**
 * __useUpdateSquadPositionMutation__
 *
 * To run a mutation, you first call `useUpdateSquadPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSquadPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSquadPositionMutation, { data, loading, error }] = useUpdateSquadPositionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSquadPositionMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateSquadPositionMutation, UpdateSquadPositionMutationVariables>,
) {
  return Apollo.useMutation<UpdateSquadPositionMutation, UpdateSquadPositionMutationVariables>(
    UpdateSquadPositionDocument,
    baseOptions,
  );
}
export type UpdateSquadPositionMutationHookResult = ReturnType<typeof useUpdateSquadPositionMutation>;
export type UpdateSquadPositionMutationResult = Apollo.MutationResult<UpdateSquadPositionMutation>;
export type UpdateSquadPositionMutationOptions = Apollo.BaseMutationOptions<
  UpdateSquadPositionMutation,
  UpdateSquadPositionMutationVariables
>;
export const DeleteSquadPositionDocument = gql`
  mutation deleteSquadPosition($id: ID!, $squadId: ID!) {
    deleteSquadPosition(id: $id, squadId: $squadId)
  }
`;
export type DeleteSquadPositionMutationFn = Apollo.MutationFunction<
  DeleteSquadPositionMutation,
  DeleteSquadPositionMutationVariables
>;

/**
 * __useDeleteSquadPositionMutation__
 *
 * To run a mutation, you first call `useDeleteSquadPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSquadPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSquadPositionMutation, { data, loading, error }] = useDeleteSquadPositionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      squadId: // value for 'squadId'
 *   },
 * });
 */
export function useDeleteSquadPositionMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteSquadPositionMutation, DeleteSquadPositionMutationVariables>,
) {
  return Apollo.useMutation<DeleteSquadPositionMutation, DeleteSquadPositionMutationVariables>(
    DeleteSquadPositionDocument,
    baseOptions,
  );
}
export type DeleteSquadPositionMutationHookResult = ReturnType<typeof useDeleteSquadPositionMutation>;
export type DeleteSquadPositionMutationResult = Apollo.MutationResult<DeleteSquadPositionMutation>;
export type DeleteSquadPositionMutationOptions = Apollo.BaseMutationOptions<
  DeleteSquadPositionMutation,
  DeleteSquadPositionMutationVariables
>;
