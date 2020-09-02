import React from 'react';
import { List } from 'antd';

import { useUserActivity } from '@/graphql/users';

import { useProfileContext } from '../ProfileContext';
import ActivityItem from './ActivityItem';

const ProfileActivity = () => {
  const { userId } = useProfileContext();
  const userActivity = useUserActivity({ id: userId });

  return (
    <List
      loading={userActivity.loading}
      dataSource={userActivity.data}
      rowKey="id"
      renderItem={activity => <ActivityItem activity={activity} />}
    />
  );
};

export default ProfileActivity;
