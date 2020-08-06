import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import { Paragraph, Title } from '@/components/atoms';
import { Card, CardMeta } from '@/components/molecules';

import { useClansQuery } from './GuildClans.apollo';

const Grid = styled.div({
  display: 'grid',
  gridGap: 24,
  gridTemplateColumns: 'repeat(4, 1fr)',
  margin: 32,
});

const GuildClans = () => {
  const { id } = useParams();
  const { data } = useClansQuery({ variables: { guildId: id } });

  if (!data) return null;

  return (
    <Grid>
      {data.clans.map(item => (
        <Card hoverable cover={<img alt={item.name} src={item.image} />} p={16}>
          <CardMeta
            title={<Title level={4}>{item.name}</Title>}
            description={<Paragraph ellipsis={{ rows: 4 }}>{item.description}</Paragraph>}
          />
        </Card>
      ))}
    </Grid>
  );
};

export default GuildClans;
