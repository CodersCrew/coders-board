import { ChaptersQuery, useChaptersQuery } from './chapter.apollo';

export type UseChapters = {
  item: ChaptersQuery['chapters'][number];
  params: { squadId: string };
};

export const useChapters = (params: UseChapters['params']) => {
  const { data, loading, error, refetch } = useChaptersQuery({ variables: { squadId: params.squadId } });

  return {
    loading,
    error,
    data: data?.chapters ?? [],
    refetch,
  };
};
