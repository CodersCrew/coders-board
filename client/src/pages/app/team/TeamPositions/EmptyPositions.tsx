import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Empty } from 'antd';

import { Button } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { CFC } from '@/typings/components';

type EmptyPositionsProps = {
  openModal: () => void;
  membersCount: number;
};

export const EmptyPositions: CFC<EmptyPositionsProps> = ({ openModal, membersCount }) => {
  return (
    <Card>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          membersCount ? 'No positions for specified search criteria' : "You don't have any positions in this team"
        }
      >
        {!membersCount && (
          <Button icon={<PlusOutlined />} ml="auto" type="primary" onClick={() => openModal()}>
            Add position
          </Button>
        )}
      </Empty>
    </Card>
  );
};
