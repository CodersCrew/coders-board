import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Empty } from 'antd';

import { Button } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { CFC } from '@/typings/components';

import { useSquadContext } from '../SquadContext';

type EmptyPositionsProps = {
  openModal: () => void;
  positionsCount: number;
};

export const EmptyPositions: CFC<EmptyPositionsProps> = ({ openModal, positionsCount }) => {
  const { squadRole } = useSquadContext();

  return (
    <Card>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          positionsCount ? 'No positions for specified search criteria' : "You don't have any positions in this squad"
        }
      >
        {!positionsCount && squadRole.isManager && (
          <Button icon={<PlusOutlined />} ml="auto" type="primary" onClick={() => openModal()}>
            Add position
          </Button>
        )}
      </Empty>
    </Card>
  );
};
