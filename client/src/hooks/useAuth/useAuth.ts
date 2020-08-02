import { useAuthMeQuery } from './useAuth.apollo';

export const useAuth = () => {
  const { loading, data, error } = useAuthMeQuery();

  return {
    isAuthorized: !!data,
    loading,
    data,
    error,
  };
};
