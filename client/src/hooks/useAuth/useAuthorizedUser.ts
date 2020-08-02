import { useNavigate } from 'react-router-dom';

import { UserRole } from '@/typings/graphql';

import { useAuthMeQuery, useSignOutMutation } from './useAuth.apollo';

export const useAuthorizedUser = () => {
  const { data, refetch } = useAuthMeQuery();
  const navigate = useNavigate();
  const [signOut, { client }] = useSignOutMutation();

  if (!data?.me) {
    throw new Error('useAuthorizedUser hook can be used only in views for authorized users');
  }

  const logout = async () => {
    await signOut();
    client.clearStore();
    navigate('/login');
  };

  return {
    isAdmin: data?.me.role === UserRole.Admin,
    profileImage: data.me.image,
    id: data.me.id,
    fullName: `${data.me.firstName} ${data.me.lastName}`,
    authMutations: { refetch, logout },
  };
};
