import React from 'react';

import { useTeamsQuery } from './Teams.apollo';
import { TeamsList } from './TeamsList';
import { Box } from '@/components/atoms';
import { PageHeader } from '@/components/molecules';

const Teams = () => {
  const { loading, data } = useTeamsQuery();

  return (
    <>
      <PageHeader title="Teams" subTitle="All teams in CodersCrew you can be a part of" />
      <Box p={24}>
        <TeamsList loading={loading} data={data?.guilds} title="Guilds" />
        <TeamsList loading={loading} data={data?.squads} title="Squads" />
        <TeamsList loading={loading} data={data?.taskforces} title="Task Forces" />
      </Box>
    </>
  );
};

export default Teams;
