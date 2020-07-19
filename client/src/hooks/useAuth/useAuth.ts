import { useAuthMeQuery } from './useAuth.apollo';

export const useAuth = () => {
  const { loading, data, error, refetch } = useAuthMeQuery();

  return {
    isAuthorized: !!data,
    loading,
    data,
    error,
    refetch,
  };
};
