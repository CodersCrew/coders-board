import React from 'react';
import styled from '@emotion/styled';

import { Paragraph, Title } from '@/components/atoms';
import { Card, CardMeta } from '@/components/molecules';
import { useChapters } from '@/graphql/squads';

import { useSquadContext } from './SquadContext';

const Grid = styled.div({
  display: 'grid',
  gridGap: 24,
  gridTemplateColumns: 'repeat(4, 1fr)',
});

const SquadChapters = () => {
  const { squadId } = useSquadContext();
  const chapters = useChapters({ squadId });

  return (
    <Grid>
      {chapters.data.map(item => (
        <Card hoverable p={16} key={item.id}>
          <CardMeta
            title={<Title level={4}>{item.name}</Title>}
            description={<Paragraph ellipsis={{ rows: 4 }}>{item.description}</Paragraph>}
          />
        </Card>
      ))}
    </Grid>
  );
};

export default SquadChapters;
