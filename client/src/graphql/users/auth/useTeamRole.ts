import { TeamRole } from '@/typings/graphql';

import { useAuthorizedUser } from './useAuthorizedUser';

const roleValues = {
  [TeamRole.Member]: 0,
  [TeamRole.Manager]: 1,
  [TeamRole.Owner]: 2,
};

export const useTeamRole = (teamId: string) => {
  const authorizedUser = useAuthorizedUser();

  const { isAdmin } = authorizedUser;
  const role = authorizedUser.teamRoles[teamId]?.role;
  console.log(teamId, authorizedUser);
  const roleValue = role ? roleValues[role] : -1;

  return {
    isOwner: roleValue === 2 || isAdmin,
    isManager: roleValue >= 1 || isAdmin,
    isMember: roleValue >= 0 || isAdmin,
    isInTeam: roleValue >= 0,
  };
};
