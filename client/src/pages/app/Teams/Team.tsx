import React from 'react';
import { Link } from 'react-router-dom';

import { Paragraph, Title } from '@/components/atoms';
import { Card, CardMeta } from '@/components/molecules';
import { CFC } from '@/typings/components';

import { TeamObject } from './Team.types';

type TeamProps = TeamObject & {
  type: 'squad' | 'guild';
};

export const Team: CFC<TeamProps> = props => {
  return (
    <Link key={props.id} to={`/app/${props.type}/${props.id}/members`}>
      <Card hoverable cover={<img alt={props.name} src={props.image} />} p={16}>
        <CardMeta
          title={<Title level={4}>{props.name}</Title>}
          description={<Paragraph ellipsis={{ rows: 4 }}>{props.description}</Paragraph>}
        />
      </Card>
    </Link>
  );
};
