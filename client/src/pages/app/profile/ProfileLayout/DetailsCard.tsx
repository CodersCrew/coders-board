import React from 'react';

import { Card } from '@/components/molecules';
import { FC } from '@/typings/components';

export const DetailsCard: FC = ({ children }) => {
  return <Card p={24}>{children}</Card>;
};
