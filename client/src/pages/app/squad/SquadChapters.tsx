import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import { Paragraph, Title } from '@/components/atoms';
import { Card, CardMeta } from '@/components/molecules';
import { useChapters } from '@/graphql/squads';

const Grid = styled.div({
  display: 'grid',
  gridGap: 24,
  gridTemplateColumns: 'repeat(4, 1fr)',
  margin: 32,
});

const SquadChapters = () => {
  const params = useParams();
  const chapters = useChapters({ squadId: params.id });

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
