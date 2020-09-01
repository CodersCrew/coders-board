import React from 'react';
import styled from '@emotion/styled';
import { List } from 'antd';

import { Avatar } from '@/components/atoms';
import { useUserActivity } from '@/graphql/users';
import { formatDate } from '@/utils/dates';

import { useProfileContext } from '../ProfileContext';

const format = formatDate('MMMM yyyy');

const AvatarImage = styled(Avatar)(({ theme }) => ({
  '&.ant-avatar': {
    width: 72,
    height: 40,
    borderRadius: theme.radii.small,
  },
}));

const ProfileActivity = () => {
  const { userId } = useProfileContext();
  const userActivity = useUserActivity({ id: userId });
  console.log(userActivity);

  return (
    <List
      loading={userActivity.loading}
      dataSource={userActivity.data}
      rowKey="id"
      renderItem={activity => (
        <List.Item>
          <List.Item.Meta
            avatar={<AvatarImage src={activity.team.image} />}
            title={activity.position.name}
            description={activity.position.notes || "There's no description for this position"}
          />
          <div>
            {format(activity.position.from)} - {activity.position.to ? format(activity.position.to) : 'Now'}
          </div>
        </List.Item>
      )}
    />
  );
};

export default ProfileActivity;
