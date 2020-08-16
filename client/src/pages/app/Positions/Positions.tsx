import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { List } from 'antd';

import { Button } from '@/components/atoms';
import { Card, FiltersCard, Page } from '@/components/molecules';
import { usePositions } from '@/graphql/positions';
import { useModalState } from '@/hooks/useModalState';
import { useQueryParam } from '@/hooks/useQueryParam';

import { Position } from './Position';
import { PositionModal, PositionModalProps } from './PositionModal';

const Positions = () => {
  const [search, setSearch] = useQueryParam('search', false);
  const positions = usePositions({ search });
  const positionModal = useModalState<PositionModalProps['data']>();

  return (
    <Page>
      <Page.Header
        title="Positions"
        subTitle="Find out all positions available across CodersCrew"
        extra={[
          <Button key="create" type="primary" icon={<PlusOutlined />} onClick={() => positionModal.open()}>
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
            renderItem={item => <Position key={item.id} openEditModal={positionModal.open} {...item} />}
          />
        </Card>
      </Page.Content>
      {positionModal.isMounted && (
        <PositionModal visible={positionModal.isVisible} data={positionModal.data} onCancel={positionModal.close} />
      )}
    </Page>
  );
};

export default Positions;
