import React from 'react';
import styled from '@emotion/styled';

import { Title } from '@/components/atoms';
import { down } from '@/services/styling';
import { CFC } from '@/typings/components';

import { Team } from './Team';
import { TeamObject } from './Team.types';

type TeamsListProps = {
  loading: boolean;
  title: string;
  data?: TeamObject[];
  type: 'squad' | 'guild';
};

const TeamListWrapper = styled.div({
  '& + &': {
    marginTop: 32,
  },
});

const Grid = styled.div({
  display: 'grid',
  gridGap: 24,
  gridTemplateColumns: 'repeat(5, 1fr)',

  [down('xxl')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },

  [down('xl')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  [down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [down('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
});

export const TeamsList: CFC<TeamsListProps> = ({ loading, data = [], title, type }) => {
  if (!loading && !data.length) return null;

  return (
    <TeamListWrapper>
      <Title level={2} mb={16}>
        {title}
      </Title>
      <Grid>
        {data.map(item => (
          <Team key={item.id} type={type} {...item} />
        ))}
      </Grid>
    </TeamListWrapper>
  );
};
