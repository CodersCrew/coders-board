import { useNavigate } from 'react-router-dom';
import { keyBy } from 'lodash-es';

import { NODE_ENV } from '@/config/env';
import { useKeySequence } from '@/hooks/useKeySequence';
import { useToggle } from '@/hooks/useToggle';
import { UserRole } from '@/typings/graphql';
import { pick } from '@/utils/objects';

import { useMeQuery, useSignOutMutation } from './auth.apollo';

export const useAuthorizedUser = () => {
  const { data, refetch } = useMeQuery();
  const isAdminToggle = useToggle(data?.me.role === UserRole.Admin);
  const navigate = useNavigate();
  const [signOut, { client }] = useSignOutMutation();

  if (!data?.me) {
    throw new Error('useAuthorizedUser hook can be used only in views for authorized users');
  }

  useKeySequence('adminnn', () => {
    if (NODE_ENV === 'development') {
      isAdminToggle.toggle();
    }
  });

  const logout = async () => {
    await signOut();
    client.clearStore();
    navigate('/login');
  };

  const teamRoles = { ...keyBy(data.me.squads, 'squadId'), ...keyBy(data.me.guilds, 'guildId') };

  return {
    ...pick(data.me, ['id', 'fullName', 'thumbnail']),
    isAdmin: isAdminToggle.on,
    teamRoles,
    refetch,
    logout,
  };
};
