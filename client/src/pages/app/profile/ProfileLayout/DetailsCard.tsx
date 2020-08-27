import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Card } from '@/components/molecules';
import { FC } from '@/typings/components';

const operationTabList = [
  {
    key: 'general',
    tab: 'General',
  },
  {
    key: 'activity',
    tab: 'Activity',
  },
];

export const DetailsCard: FC = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTabKey = location.pathname.split('/').pop();

  return (
    <Card tabList={operationTabList} activeTabKey={activeTabKey} onTabChange={navigate}>
      {children}
    </Card>
  );
};
