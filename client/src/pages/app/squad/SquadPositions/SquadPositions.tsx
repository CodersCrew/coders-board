import React from 'react';
import { List } from 'antd';
import { get, groupBy } from 'lodash';

import { Box, Spin, Title } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { UseSquadPositions, useSquadPositions } from '@/graphql/squads';
import { useModalState } from '@/hooks/useModalState';
import { useQueryParam } from '@/hooks/useQueryParam';

import { useSquadContext } from '../SquadContext';
import { EmptyPositions } from './EmptyPositions';
import { FiltersCard } from './FiltersCard';
import { SquadPosition } from './SquadPosition';
import { SquadPositionModal, SquadPositionModalProps } from './SquadPositionModal';

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
  const squadPositionModal = useModalState<SquadPositionModalProps['data']>();
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
          <SquadPosition
            {...position}
            openModal={() => squadPositionModal.open()}
            closeModal={squadPositionModal.close}
          />
        )}
      />
    </Card>
  );

  return (
    <Spin spinning={squadPositions.loading} tip="Loading member actions">
      <FiltersCard search={search} onSearch={setSearch} openModal={squadPositionModal.open} />
      {!squadPositions.loading && (
        <Box maxWidth="100%" overflow="auto" mt={32}>
          {filteredPositionItems.length === 0 && (
            <EmptyPositions positionsCount={squadPositions.count} openModal={squadPositionModal.open} />
          )}
          {current.length > 0 && renderList('Current positions', current)}
          {current.length > 0 && past.length > 0 && <Box height={24} />}
          {past.length > 0 && renderList('Past positions', past)}
        </Box>
      )}
      {squadPositionModal.isMounted && (
        <SquadPositionModal
          visible={squadPositionModal.isVisible}
          onCancel={squadPositionModal.close}
          data={squadPositionModal.data}
        />
      )}
    </Spin>
  );
};

export default SquadPositions;
