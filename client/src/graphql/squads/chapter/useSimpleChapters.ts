import { SimpleChaptersQuery, SimpleChaptersQueryVariables, useSimpleChaptersQuery } from './chapter.apollo';

export type UseSimpleChapters = {
  item: SimpleChaptersQuery['chapters'][number];
  params: SimpleChaptersQueryVariables;
};

export const useSimpleChapters = (params?: UseSimpleChapters['params']) => {
  const { data, loading, error } = useSimpleChaptersQuery({ variables: params });

  const chapters = data?.chapters ?? [];

  return {
    loading,
    error,
    data: chapters,
    count: chapters.length,
  };
};
