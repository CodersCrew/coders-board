import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../typings/graphql';

export type SuccessUserFragment = { __typename?: 'User' } & Pick<Types.User, 'id' | 'fullName' | 'thumbnail'>;

export type SuccessesQueryVariables = Types.Exact<{
  search?: Types.Maybe<Types.Scalars['String']>;
  type?: Types.Maybe<Types.SuccessType>;
}>;

export type SuccessesQuery = { __typename?: 'Query' } & {
  successes: Array<
    { __typename?: 'Success' } & Pick<Types.Success, 'id' | 'name' | 'description' | 'date' | 'type'> & {
        users: Array<{ __typename?: 'User' } & SuccessUserFragment>;
      }
  >;
};

export type CreateSuccessMutationVariables = Types.Exact<{
  data: Types.CreateSuccessInput;
}>;

export type CreateSuccessMutation = { __typename?: 'Mutation' } & {
  createSuccess: { __typename?: 'Success' } & Pick<Types.Success, 'id'>;
};

export type UpdateSuccessMutationVariables = Types.Exact<{
  data: Types.UpdateSuccessInput;
}>;

export type UpdateSuccessMutation = { __typename?: 'Mutation' } & {
  updateSuccess: { __typename?: 'Success' } & Pick<Types.Success, 'id'>;
};

export type DeleteSuccessMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type DeleteSuccessMutation = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'deleteSuccess'>;

export const SuccessUserFragmentDoc = gql`
  fragment SuccessUser on User {
    id
    fullName
    thumbnail
  }
`;
export const SuccessesDocument = gql`
  query successes($search: String, $type: SuccessType) {
    successes(search: $search, type: $type) {
      id
      name
      description
      date
      type
      users {
        ...SuccessUser
      }
    }
  }
  ${SuccessUserFragmentDoc}
`;

/**
 * __useSuccessesQuery__
 *
 * To run a query within a React component, call `useSuccessesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuccessesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuccessesQuery({
 *   variables: {
 *      search: // value for 'search'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSuccessesQuery(baseOptions?: Apollo.QueryHookOptions<SuccessesQuery, SuccessesQueryVariables>) {
  return Apollo.useQuery<SuccessesQuery, SuccessesQueryVariables>(SuccessesDocument, baseOptions);
}
export function useSuccessesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SuccessesQuery, SuccessesQueryVariables>,
) {
  return Apollo.useLazyQuery<SuccessesQuery, SuccessesQueryVariables>(SuccessesDocument, baseOptions);
}
export type SuccessesQueryHookResult = ReturnType<typeof useSuccessesQuery>;
export type SuccessesLazyQueryHookResult = ReturnType<typeof useSuccessesLazyQuery>;
export type SuccessesQueryResult = Apollo.QueryResult<SuccessesQuery, SuccessesQueryVariables>;
export const CreateSuccessDocument = gql`
  mutation createSuccess($data: CreateSuccessInput!) {
    createSuccess(data: $data) {
      id
    }
  }
`;
export type CreateSuccessMutationFn = Apollo.MutationFunction<CreateSuccessMutation, CreateSuccessMutationVariables>;

/**
 * __useCreateSuccessMutation__
 *
 * To run a mutation, you first call `useCreateSuccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSuccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSuccessMutation, { data, loading, error }] = useCreateSuccessMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSuccessMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateSuccessMutation, CreateSuccessMutationVariables>,
) {
  return Apollo.useMutation<CreateSuccessMutation, CreateSuccessMutationVariables>(CreateSuccessDocument, baseOptions);
}
export type CreateSuccessMutationHookResult = ReturnType<typeof useCreateSuccessMutation>;
export type CreateSuccessMutationResult = Apollo.MutationResult<CreateSuccessMutation>;
export type CreateSuccessMutationOptions = Apollo.BaseMutationOptions<
  CreateSuccessMutation,
  CreateSuccessMutationVariables
>;
export const UpdateSuccessDocument = gql`
  mutation updateSuccess($data: UpdateSuccessInput!) {
    updateSuccess(data: $data) {
      id
    }
  }
`;
export type UpdateSuccessMutationFn = Apollo.MutationFunction<UpdateSuccessMutation, UpdateSuccessMutationVariables>;

/**
 * __useUpdateSuccessMutation__
 *
 * To run a mutation, you first call `useUpdateSuccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSuccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSuccessMutation, { data, loading, error }] = useUpdateSuccessMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSuccessMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateSuccessMutation, UpdateSuccessMutationVariables>,
) {
  return Apollo.useMutation<UpdateSuccessMutation, UpdateSuccessMutationVariables>(UpdateSuccessDocument, baseOptions);
}
export type UpdateSuccessMutationHookResult = ReturnType<typeof useUpdateSuccessMutation>;
export type UpdateSuccessMutationResult = Apollo.MutationResult<UpdateSuccessMutation>;
export type UpdateSuccessMutationOptions = Apollo.BaseMutationOptions<
  UpdateSuccessMutation,
  UpdateSuccessMutationVariables
>;
export const DeleteSuccessDocument = gql`
  mutation deleteSuccess($id: ID!) {
    deleteSuccess(id: $id)
  }
`;
export type DeleteSuccessMutationFn = Apollo.MutationFunction<DeleteSuccessMutation, DeleteSuccessMutationVariables>;

/**
 * __useDeleteSuccessMutation__
 *
 * To run a mutation, you first call `useDeleteSuccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSuccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSuccessMutation, { data, loading, error }] = useDeleteSuccessMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSuccessMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteSuccessMutation, DeleteSuccessMutationVariables>,
) {
  return Apollo.useMutation<DeleteSuccessMutation, DeleteSuccessMutationVariables>(DeleteSuccessDocument, baseOptions);
}
export type DeleteSuccessMutationHookResult = ReturnType<typeof useDeleteSuccessMutation>;
export type DeleteSuccessMutationResult = Apollo.MutationResult<DeleteSuccessMutation>;
export type DeleteSuccessMutationOptions = Apollo.BaseMutationOptions<
  DeleteSuccessMutation,
  DeleteSuccessMutationVariables
>;
