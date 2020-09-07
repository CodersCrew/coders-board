import { ChaptersQuery, ChaptersQueryVariables, useChaptersQuery } from './chapter.apollo';

export type UseChapters = {
  item: ChaptersQuery['chapters'][number];
  variables: ChaptersQueryVariables;
};

export const useChapters = (variables: UseChapters['variables']) => {
  const { data, loading, error, refetch } = useChaptersQuery({ variables });

  const chapters = data?.chapters ?? [];

  return {
    loading,
    error,
    refetch,
    data: chapters,
    count: chapters.length,
  };
};
