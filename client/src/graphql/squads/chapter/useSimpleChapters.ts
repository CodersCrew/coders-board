import { SimpleChaptersQuery, SimpleChaptersQueryVariables, useSimpleChaptersQuery } from './chapter.apollo';

export type UseSimpleChapters = {
  item: SimpleChaptersQuery['chapters'][number];
  variables: SimpleChaptersQueryVariables;
};

export const useSimpleChapters = (variables: UseSimpleChapters['variables']) => {
  const { data, loading, error, refetch } = useSimpleChaptersQuery({ variables });

  const chapters = data?.chapters ?? [];

  return {
    loading,
    error,
    refetch,
    data: chapters,
    count: chapters.length,
  };
};
