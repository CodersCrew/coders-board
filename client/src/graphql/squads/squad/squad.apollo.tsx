import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type SquadQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type SquadQuery = { __typename?: 'Query' } & {
  squad: { __typename?: 'Squad' } & Pick<Types.Squad, 'id' | 'name' | 'description' | 'image'>;
};

export type SquadsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type SquadsQuery = { __typename?: 'Query' } & {
  squads: Array<{ __typename?: 'Squad' } & Pick<Types.Squad, 'id' | 'name' | 'color' | 'description' | 'image'>>;
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
export const SquadsDocument = gql`
  query squads {
    squads {
      id
      name
      color
      description
      image
    }
  }
`;

/**
 * __useSquadsQuery__
 *
 * To run a query within a React component, call `useSquadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSquadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSquadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSquadsQuery(baseOptions?: Apollo.QueryHookOptions<SquadsQuery, SquadsQueryVariables>) {
  return Apollo.useQuery<SquadsQuery, SquadsQueryVariables>(SquadsDocument, baseOptions);
}
export function useSquadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SquadsQuery, SquadsQueryVariables>) {
  return Apollo.useLazyQuery<SquadsQuery, SquadsQueryVariables>(SquadsDocument, baseOptions);
}
export type SquadsQueryHookResult = ReturnType<typeof useSquadsQuery>;
export type SquadsLazyQueryHookResult = ReturnType<typeof useSquadsLazyQuery>;
export type SquadsQueryResult = Apollo.QueryResult<SquadsQuery, SquadsQueryVariables>;
