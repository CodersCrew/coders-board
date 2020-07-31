import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { Paragraph, Title } from '@/components/atoms';
import { Card, CardMeta } from '@/components/molecules';
import { CFC } from '@/typings/components';

import { TeamsListFieldsFragment } from './Teams.apollo';

type TeamsListProps = {
  loading: boolean;
  title: string;
  data?: TeamsListFieldsFragment[];
};

const TeamListWrapper = styled.div({
  '& + &': {
    marginTop: 32,
  },
});

const Grid = styled.div({
  display: 'grid',
  gridGap: 24,
  gridTemplateColumns: 'repeat(4, 1fr)',
});

export const TeamsList: CFC<TeamsListProps> = ({ loading, data = [], title }) => {
  if (!loading && !data.length) return null;

  return (
    <TeamListWrapper>
      <Title level={2} mb={16}>
        {title}
      </Title>
      <Grid>
        {data.map(item => (
          <Link key={item.id} to={`/app/teams/${item.id}/members`}>
            <Card hoverable cover={<img alt={item.name} src={item.image} />} p={16}>
              <CardMeta
                title={<Title level={4}>{item.name}</Title>}
                description={<Paragraph ellipsis={{ rows: 4 }}>{item.description}</Paragraph>}
              />
            </Card>
          </Link>
        ))}
      </Grid>
    </TeamListWrapper>
  );
};
