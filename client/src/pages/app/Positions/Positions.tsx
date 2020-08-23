import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { List } from 'antd';

import { Button } from '@/components/atoms';
import { Card, FiltersCard, Page } from '@/components/molecules';
import { usePositions } from '@/graphql/positions';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useDataModal } from '@/services/dataModal';

import { Position } from './Position';
import { PositionModal, PositionModalData } from './PositionModal';

const Positions = () => {
  const [search, setSearch] = useQueryParam('search', false);
  const positions = usePositions({ search });
  const positionModal = useDataModal<PositionModalData>();

  return (
    <Page>
      <Page.Header
        title="Positions"
        subTitle="Find out all positions available across CodersCrew"
        extra={[
          <Button key="create" type="primary" icon={<PlusOutlined />} onClick={() => positionModal.open(null)}>
            Create position
          </Button>,
        ]}
      />
      <Page.Content>
        <FiltersCard search={{ value: search, onSearch: setSearch }} />
        <Card>
          <List
            rowKey="id"
            size="small"
            itemLayout="horizontal"
            loading={positions.loading}
            dataSource={positions.data}
            renderItem={item => <Position key={item.id} openEditModal={() => positionModal.open(null)} {...item} />}
          />
        </Card>
      </Page.Content>
      <PositionModal {...positionModal} />
    </Page>
  );
};

export default Positions;
