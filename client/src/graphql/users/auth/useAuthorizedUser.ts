import { useNavigate } from 'react-router-dom';

import { UserRole } from '@/typings/graphql';

import { useMeQuery, useSignOutMutation } from './auth.apollo';

export const useAuthorizedUser = () => {
  const { data, refetch } = useMeQuery();
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
    isAdmin: data.me.role === UserRole.Admin,
    image: data.me.image,
    id: data.me.id,
    fullName: data.me.fullName,
    refetch,
    logout,
  };
};
