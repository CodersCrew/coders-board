import React from 'react';
import styled from '@emotion/styled';

import { Paragraph, Title } from '@/components/atoms';
import { Card, CardMeta } from '@/components/molecules';
import { useClans } from '@/graphql/guilds';

import { useGuildContext } from './GuildContext';

const Grid = styled.div({
  display: 'grid',
  gridGap: 24,
  gridTemplateColumns: 'repeat(4, 1fr)',
});

const GuildClans = () => {
  const { guildId } = useGuildContext();
  const clans = useClans({ guildId });

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
