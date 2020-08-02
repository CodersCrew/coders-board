import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type PositionsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PositionsQuery = { __typename?: 'Query' } & {
  positions: Array<
    { __typename?: 'Position' } & Pick<Types.Position, 'id' | 'name' | 'description' | 'image'> & {
        team?: Types.Maybe<{ __typename?: 'Position' } & Pick<Types.Position, 'id' | 'name' | 'image'>>;
      }
  >;
};

export const PositionsDocument = gql`
  query positions {
    positions {
      id
      name
      description
      image
      team {
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
