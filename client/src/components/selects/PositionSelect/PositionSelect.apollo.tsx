import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type PositionSelectPositionsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PositionSelectPositionsQuery = { __typename?: 'Query' } & {
  positions: Array<{ __typename?: 'Position' } & Pick<Types.Position, 'id' | 'name'>>;
};

export const PositionSelectPositionsDocument = gql`
  query positionSelectPositions {
    positions {
      id
      name
    }
  }
`;

/**
 * __usePositionSelectPositionsQuery__
 *
 * To run a query within a React component, call `usePositionSelectPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionSelectPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionSelectPositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePositionSelectPositionsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<PositionSelectPositionsQuery, PositionSelectPositionsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<PositionSelectPositionsQuery, PositionSelectPositionsQueryVariables>(
    PositionSelectPositionsDocument,
    baseOptions,
  );
}
export function usePositionSelectPositionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PositionSelectPositionsQuery,
    PositionSelectPositionsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<PositionSelectPositionsQuery, PositionSelectPositionsQueryVariables>(
    PositionSelectPositionsDocument,
    baseOptions,
  );
}
export type PositionSelectPositionsQueryHookResult = ReturnType<typeof usePositionSelectPositionsQuery>;
export type PositionSelectPositionsLazyQueryHookResult = ReturnType<typeof usePositionSelectPositionsLazyQuery>;
export type PositionSelectPositionsQueryResult = ApolloReactCommon.QueryResult<
  PositionSelectPositionsQuery,
  PositionSelectPositionsQueryVariables
>;
