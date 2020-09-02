import React from 'react';
import styled from '@emotion/styled';
import { List } from 'antd';

import { Avatar, Box, Link, Title } from '@/components/atoms';
import { UseUserActivity } from '@/graphql/users';
import { CFC } from '@/typings/components';
import { formatDate } from '@/utils/dates';

type ActivityItemProps = {
  activity: UseUserActivity['item'];
};

const format = formatDate('MMMM yyyy');

const AvatarImage = styled(Avatar)(({ theme }) => ({
  '&.ant-avatar': {
    width: 72,
    height: 40,
    borderRadius: theme.radii.small,
  },
}));

const ActivityItem: CFC<ActivityItemProps> = ({ activity }) => {
  const title = (
    <Box>
      <Title level={4}>{activity.position.name}</Title>
      <Link fontWeight="normal" color="text.secondary" to={`/app/${activity.team.type}/${activity.team.id}`}>
        {activity.team.name} {activity.team.type}
      </Link>
    </Box>
  );

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<AvatarImage src={activity.team.image} />}
        title={title}
        description={activity.position.notes}
      />
      <div>
        {format(activity.position.from)} - {activity.position.to ? format(activity.position.to) : 'Now'}
      </div>
    </List.Item>
  );
};

export default ActivityItem;
