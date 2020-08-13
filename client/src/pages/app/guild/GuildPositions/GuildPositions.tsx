import React from 'react';
import { List } from 'antd';
import { get, groupBy } from 'lodash';

import { Box, Spin, Title } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { UseGuildPositions, useGuildPositions } from '@/graphql/guilds';
import { useModalState } from '@/hooks/useModalState';
import { useQueryParam } from '@/hooks/useQueryParam';

import { useGuildContext } from '../GuildContext';
import { EmptyPositions } from './EmptyPositions';
import { FiltersCard } from './FiltersCard';
import { GuildPosition } from './GuildPosition';
import { GuildPositionModal, GuildPositionModalProps } from './GuildPositionModal';

const filterPositions = (positions: UseGuildPositions['item'][], search: string) => {
  if (!search || !positions.length) return positions;

  const searchText = search.toLocaleLowerCase();
  const pathsToSearch = ['member.user.fullName', 'kind'];

  return positions.filter(position =>
    pathsToSearch.some(key => get(position, key)?.toLowerCase().includes(searchText)),
  );
};

const GuildPositions = () => {
  const { guildId } = useGuildContext();
  const guildPositions = useGuildPositions({ guildId });
  const guildPositionModal = useModalState<GuildPositionModalProps['data']>();
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
      <FiltersCard search={search} onSearch={setSearch} openModal={guildPositionModal.open} />
      {!guildPositions.loading && (
        <Box maxWidth="100%" overflow="auto" mt={32}>
          {filteredPositionItems.length === 0 && (
            <EmptyPositions positionsCount={guildPositions.count} openModal={guildPositionModal.open} />
          )}
          {current.length > 0 && renderList('Current positions', current)}
          {current.length > 0 && past.length > 0 && <Box height={24} />}
          {past.length > 0 && renderList('Past positions', past)}
        </Box>
      )}
      {guildPositionModal.isMounted && (
        <GuildPositionModal
          visible={guildPositionModal.isVisible}
          onCancel={guildPositionModal.close}
          data={guildPositionModal.data}
        />
      )}
    </Spin>
  );
};

export default GuildPositions;
