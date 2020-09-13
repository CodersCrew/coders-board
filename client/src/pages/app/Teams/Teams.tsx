import React from 'react';

import { Page } from '@/components/molecules';
import { useGuilds } from '@/graphql/guilds';
import { useSquads } from '@/graphql/squads';

import { TeamsList } from './TeamsList';

const Teams = () => {
  const guilds = useGuilds();
  const squads = useSquads();

  return (
    <Page>
      <Page.Header title="Teams" subTitle="All teams in CodersCrew you can be a part of" />
      <Page.Content>
        <TeamsList
          loading={guilds.loading}
          data={guilds.data}
          type="guild"
          title="Guilds"
          subtitle="Areas where you can expand your knowledge and share it with others"
        />
        <TeamsList
          loading={squads.loading}
          data={squads.data}
          type="squad"
          title="Squads"
          subtitle="Teams where you can apply your knowledge and create something awesome"
        />
      </Page.Content>
    </Page>
  );
};

export default Teams;
