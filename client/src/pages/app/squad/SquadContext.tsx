import { useParams } from 'react-router-dom';
import { createContainer } from 'unstated-next';

import { useTeamRole } from '@/graphql/users';

const useSquadContextHook = () => {
  const params = useParams();

  const squadId = params.id;

  const squadRole = useTeamRole(squadId);

  return {
    squadId,
    squadRole,
  };
};

const SquadContext = createContainer(useSquadContextHook);

export const useSquadContext = SquadContext.useContainer;

export const SquadContextProvider = SquadContext.Provider;
