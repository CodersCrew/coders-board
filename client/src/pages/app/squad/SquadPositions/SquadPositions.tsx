import React from 'react';
import { List } from 'antd';
import { get } from 'lodash';

import { Box, Spin, Title } from '@/components/atoms';
import { Card, FiltersCard } from '@/components/molecules';
import { UseSquadPositions, useSquadPositions } from '@/graphql/squads';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useDataModal } from '@/services/modals';
import { groupBy } from '@/utils/arrays';

import { useSquadContext } from '../SquadContext';
import { EmptyPositions } from './EmptyPositions';
import { SquadPosition } from './SquadPosition';
import { SquadPositionModal, SquadPositionModalData } from './SquadPositionModal';

const filterPositions = (positions: UseSquadPositions['item'][], search: string) => {
  if (!search || !positions.length) return positions;

  const searchText = search.toLocaleLowerCase();
  const pathsToSearch = ['member.user.fullName', 'kind'];

  return positions.filter(position =>
    pathsToSearch.some(key => get(position, key)?.toLowerCase().includes(searchText)),
  );
};

const SquadPositions = () => {
  const { squadId } = useSquadContext();
  const squadPositions = useSquadPositions({ squadId });
  const squadPositionModal = useDataModal<SquadPositionModalData>();
  const [search, setSearch] = useQueryParam('search', false);

  const filteredPositionItems = filterPositions(squadPositions.data, search);

  const { current = [], past = [] } = groupBy(filteredPositionItems, position => (position.to ? 'past' : 'current'));

  const renderList = (title: string, dataSource: UseSquadPositions['item'][]) => (
    <Card px={24}>
      <List
        header={<Title level={4}>{title}</Title>}
        loading={squadPositions.loading}
        dataSource={dataSource}
        rowKey="id"
        renderItem={position => (
          <SquadPosition {...position} openModal={squadPositionModal.open} closeModal={squadPositionModal.close} />
        )}
      />
    </Card>
  );

  return (
    <Spin spinning={squadPositions.loading} tip="Loading member actions">
      <FiltersCard
        search={{ value: search, onSearch: setSearch }}
        addButton={{ label: 'Add position', onClick: () => squadPositionModal.open(null) }}
      />
      {!squadPositions.loading && (
        <Box maxWidth="100%" overflow="auto" mt={32}>
          {filteredPositionItems.length === 0 && (
            <EmptyPositions positionsCount={squadPositions.count} openModal={() => squadPositionModal.open(null)} />
          )}
          {current.length > 0 && renderList('Current positions', current)}
          {current.length > 0 && past.length > 0 && <Box height={24} />}
          {past.length > 0 && renderList('Past positions', past)}
        </Box>
      )}
      <SquadPositionModal {...squadPositionModal} />
    </Spin>
  );
};

export default SquadPositions;
