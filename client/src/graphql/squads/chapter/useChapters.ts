import { useEffect } from 'react';

import { ChaptersQuery, useChaptersLazyQuery } from './chapter.apollo';

export type UseChapters = {
  item: ChaptersQuery['chapters'][number];
  params: { squadId?: string };
};

export const useChapters = (params: UseChapters['params']) => {
  const [fetchChapters, { data, loading, error }] = useChaptersLazyQuery();

  useEffect(() => {
    if (params?.squadId) {
      fetchChapters({ variables: { squadId: params.squadId } });
    }
  }, [params?.squadId]);

  return {
    loading,
    error,
    data: data?.chapters ?? [],
    fetch: fetchChapters,
  };
};
