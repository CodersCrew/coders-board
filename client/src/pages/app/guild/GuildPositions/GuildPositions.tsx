import React from 'react';
import { List } from 'antd';
import { get } from 'lodash';

import { Box, Spin, Title } from '@/components/atoms';
import { Card, FiltersCard } from '@/components/molecules';
import { UseGuildPositions, useGuildPositions } from '@/graphql/guilds';
import { useQueryParam } from '@/hooks/useQueryParam';
import { useDataModal } from '@/services/dataModal';
import { groupBy } from '@/utils/arrays';

import { useGuildContext } from '../GuildContext';
import { EmptyPositions } from './EmptyPositions';
import { GuildPosition } from './GuildPosition';
import { GuildPositionModal, GuildPositionModalData } from './GuildPositionModal';

const filterPositions = (positions: UseGuildPositions['item'][], search: string) => {
  if (!search || !positions.length) return positions;

  const searchText = search.toLocaleLowerCase();
  const pathsToSearch = ['member.user.fullName', 'kind'];

  return positions.filter(position =>
    pathsToSearch.some(key => get(position, key)?.toLowerCase().includes(searchText)),
  );
};

const GuildPositions = () => {
  const { guildId, guildRole } = useGuildContext();
  const guildPositions = useGuildPositions({ guildId });
  const guildPositionModal = useDataModal<GuildPositionModalData>();
  const [search, setSearch] = useQueryParam('search', false);

  const filteredPositionItems = filterPositions(guildPositions.data, search);

  const { current = [], past = [] } = groupBy(filteredPositionItems, position => (position.to ? 'past' : 'current'));

  const renderList = (title: string, dataSource: UseGuildPositions['item'][]) => (
    <Card px={24}>
      <List
        header={<Title level={4}>{title}</Title>}
        loading={guildPositions.loading}
        dataSource={dataSource}
        rowKey="id"
        renderItem={position => (
          <GuildPosition {...position} openModal={guildPositionModal.open} closeModal={guildPositionModal.close} />
        )}
      />
    </Card>
  );

  return (
    <Spin spinning={guildPositions.loading} tip="Loading member actions">
      <FiltersCard
        search={{ value: search, onSearch: setSearch, autoFocus: true }}
        addButton={guildRole.isManager && { label: 'Add position', onClick: () => guildPositionModal.open(null) }}
      />
      {!guildPositions.loading && (
        <Box maxWidth="100%" overflow="auto" mt={32}>
          {filteredPositionItems.length === 0 && (
            <EmptyPositions positionsCount={guildPositions.count} openModal={() => guildPositionModal.open(null)} />
          )}
          {current.length > 0 && renderList('Current positions', current)}
          {current.length > 0 && past.length > 0 && <Box height={24} />}
          {past.length > 0 && renderList('Past positions', past)}
        </Box>
      )}
      <GuildPositionModal {...guildPositionModal} />
    </Spin>
  );
};

export default GuildPositions;
