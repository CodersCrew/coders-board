import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import { Paragraph, Title } from '@/components/atoms';
import { Card, CardMeta } from '@/components/molecules';
import { useClans } from '@/graphql/guilds';

const Grid = styled.div({
  display: 'grid',
  gridGap: 24,
  gridTemplateColumns: 'repeat(4, 1fr)',
  margin: 32,
});

const GuildClans = () => {
  const params = useParams();
  const clans = useClans({ guildId: params.id });

  return (
    <Grid>
      {clans.data.map(item => (
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
