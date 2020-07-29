import { useAuth } from './useAuth';
import { UserRole } from '@/typings/graphql';

export const useIsAdmin = () => {
  const { data } = useAuth();

  return {
    isAdmin: data?.me.role === UserRole.Admin,
  };
};
