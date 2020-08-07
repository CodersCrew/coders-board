import { MeQuery, useMeQuery } from './auth.apollo';

export type UseAuth = {
  data: MeQuery['me'];
};

export const useAuth = () => {
  const { loading, data, error } = useMeQuery();

  const me = data?.me ?? null;

  return {
    isAuthorized: Boolean(me),
    data: me,
    loading,
    error,
  };
};
