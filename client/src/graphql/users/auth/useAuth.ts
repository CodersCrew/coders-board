import { useMeQuery } from './auth.apollo';

export const useAuth = () => {
  const { loading, data, error } = useMeQuery();

  const me = data?.me ?? null;

  return {
    isAuthorized: Boolean(me),
    loading,
    error,
  };
};
