import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../../../typings/graphql';

export type ChapterSelectChaptersQueryVariables = Types.Exact<{
  squadId: Types.Scalars['ID'];
}>;

export type ChapterSelectChaptersQuery = { __typename?: 'Query' } & {
  chapters: Array<{ __typename?: 'Chapter' } & Pick<Types.Chapter, 'id' | 'name'>>;
};

export const ChapterSelectChaptersDocument = gql`
  query chapterSelectChapters($squadId: ID!) {
    chapters(squadId: $squadId) {
      id
      name
    }
  }
`;

/**
 * __useChapterSelectChaptersQuery__
 *
 * To run a query within a React component, call `useChapterSelectChaptersQuery` and pass it any options that fit your needs.
 * When your component renders, `useChapterSelectChaptersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChapterSelectChaptersQuery({
 *   variables: {
 *      squadId: // value for 'squadId'
 *   },
 * });
 */
export function useChapterSelectChaptersQuery(
  baseOptions?: Apollo.QueryHookOptions<ChapterSelectChaptersQuery, ChapterSelectChaptersQueryVariables>,
) {
  return Apollo.useQuery<ChapterSelectChaptersQuery, ChapterSelectChaptersQueryVariables>(
    ChapterSelectChaptersDocument,
    baseOptions,
  );
}
export function useChapterSelectChaptersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ChapterSelectChaptersQuery, ChapterSelectChaptersQueryVariables>,
) {
  return Apollo.useLazyQuery<ChapterSelectChaptersQuery, ChapterSelectChaptersQueryVariables>(
    ChapterSelectChaptersDocument,
    baseOptions,
  );
}
export type ChapterSelectChaptersQueryHookResult = ReturnType<typeof useChapterSelectChaptersQuery>;
export type ChapterSelectChaptersLazyQueryHookResult = ReturnType<typeof useChapterSelectChaptersLazyQuery>;
export type ChapterSelectChaptersQueryResult = Apollo.QueryResult<
  ChapterSelectChaptersQuery,
  ChapterSelectChaptersQueryVariables
>;
