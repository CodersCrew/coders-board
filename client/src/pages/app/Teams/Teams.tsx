import React from 'react';

import { Page } from '@/components/molecules';

import { useTeamsQuery } from './Teams.apollo';
import { TeamsList } from './TeamsList';

const Teams = () => {
  const { loading, data } = useTeamsQuery();

  return (
    <Page>
      <Page.Header title="Teams" subTitle="All teams in CodersCrew you can be a part of" />
      <Page.Content>
        <TeamsList loading={loading} data={data?.guilds} type="guild" title="Guilds" />
        <TeamsList loading={loading} data={data?.squads} type="squad" title="Squads" />
      </Page.Content>
    </Page>
  );
};

export default Teams;
