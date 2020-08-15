import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type ChaptersQueryVariables = Types.Exact<{
  squadId: Types.Scalars['ID'];
}>;

export type ChaptersQuery = { __typename?: 'Query' } & {
  chapters: Array<{ __typename?: 'Chapter' } & Pick<Types.Chapter, 'id' | 'name' | 'description'>>;
};

export const ChaptersDocument = gql`
  query chapters($squadId: ID!) {
    chapters(squadId: $squadId) {
      id
      name
      description
    }
  }
`;

/**
 * __useChaptersQuery__
 *
 * To run a query within a React component, call `useChaptersQuery` and pass it any options that fit your needs.
 * When your component renders, `useChaptersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChaptersQuery({
 *   variables: {
 *      squadId: // value for 'squadId'
 *   },
 * });
 */
export function useChaptersQuery(baseOptions?: Apollo.QueryHookOptions<ChaptersQuery, ChaptersQueryVariables>) {
  return Apollo.useQuery<ChaptersQuery, ChaptersQueryVariables>(ChaptersDocument, baseOptions);
}
export function useChaptersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChaptersQuery, ChaptersQueryVariables>) {
  return Apollo.useLazyQuery<ChaptersQuery, ChaptersQueryVariables>(ChaptersDocument, baseOptions);
}
export type ChaptersQueryHookResult = ReturnType<typeof useChaptersQuery>;
export type ChaptersLazyQueryHookResult = ReturnType<typeof useChaptersLazyQuery>;
export type ChaptersQueryResult = Apollo.QueryResult<ChaptersQuery, ChaptersQueryVariables>;
