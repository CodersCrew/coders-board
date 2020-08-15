import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type SquadQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type SquadQuery = { __typename?: 'Query' } & {
  squad: { __typename?: 'Squad' } & Pick<Types.Squad, 'id' | 'name' | 'description' | 'image'>;
};

export const SquadDocument = gql`
  query squad($id: ID!) {
    squad(id: $id) {
      id
      name
      description
      image
    }
  }
`;

/**
 * __useSquadQuery__
 *
 * To run a query within a React component, call `useSquadQuery` and pass it any options that fit your needs.
 * When your component renders, `useSquadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSquadQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSquadQuery(baseOptions?: Apollo.QueryHookOptions<SquadQuery, SquadQueryVariables>) {
  return Apollo.useQuery<SquadQuery, SquadQueryVariables>(SquadDocument, baseOptions);
}
export function useSquadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SquadQuery, SquadQueryVariables>) {
  return Apollo.useLazyQuery<SquadQuery, SquadQueryVariables>(SquadDocument, baseOptions);
}
export type SquadQueryHookResult = ReturnType<typeof useSquadQuery>;
export type SquadLazyQueryHookResult = ReturnType<typeof useSquadLazyQuery>;
export type SquadQueryResult = Apollo.QueryResult<SquadQuery, SquadQueryVariables>;
