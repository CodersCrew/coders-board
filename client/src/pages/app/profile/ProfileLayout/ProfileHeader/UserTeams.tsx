import React from 'react';
import styled from '@emotion/styled';

import { UseBaseUserInfo } from '@/graphql/users';
import { CFC } from '@/typings/components';

import { TeamsList } from './TeamsList';

type UserTeamsProps = {
  guilds: UseBaseUserInfo['data']['guilds'];
  squads: UseBaseUserInfo['data']['squads'];
};

const UserTeamsWrapper = styled.div({
  display: 'flex',

  '> * + *': {
    marginLeft: 16,
  },
});

export const UserTeams: CFC<UserTeamsProps> = ({ guilds, squads }) => {
  return (
    <UserTeamsWrapper>
      {guilds.length > 0 && <TeamsList title="Guilds" items={guilds.map(({ guild }) => guild)} />}
      {squads.length > 0 && <TeamsList title="Squads" items={squads.map(({ squad }) => squad)} />}
    </UserTeamsWrapper>
  );
};
