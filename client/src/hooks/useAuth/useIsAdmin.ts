import { UserRole } from '@/typings/graphql';

import { useAuth } from './useAuth';

export const useIsAdmin = () => {
  const { data } = useAuth();

  return {
    isAdmin: data?.me.role === UserRole.Admin,
  };
};
