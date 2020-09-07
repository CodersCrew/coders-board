import { useParams } from 'react-router-dom';
import { createContainer } from 'unstated-next';

import { useTeamRole } from '@/graphql/users';

const useGuildContextHook = () => {
  const params = useParams();

  const guildId = params.id;

  const guildRole = useTeamRole(guildId);

  return {
    guildId,
    guildRole,
  };
};

const GuildContext = createContainer(useGuildContextHook);

export const useGuildContext = GuildContext.useContainer;

export const GuildContextProvider = GuildContext.Provider;
