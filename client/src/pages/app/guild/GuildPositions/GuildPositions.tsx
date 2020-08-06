import React from 'react';
import { useParams } from 'react-router-dom';
import { List } from 'antd';
import { get, groupBy } from 'lodash';

import { Box, Spin, Title } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { useModalState } from '@/hooks/useModalState';
import { useQueryParam } from '@/hooks/useQueryParam';

import { EmptyPositions } from './EmptyPositions';
import { FiltersCard } from './FiltersCard';
import { GuildPosition } from './GuildPosition';
import { GuildPositionModal } from './GuildPositionModal';
import { useGuildMembersIdsQuery, useGuildPositionsQuery } from './GuildPositions.apollo';
import { GuildPositionItem, GuildPositionModalState } from './GuildPositions.types';

const filterPositions = (positions: GuildPositionItem[], search: string) => {
  if (!search || !positions.length) return positions;

  const searchText = search.toLocaleLowerCase();
  const pathsToSearch = ['member.user.fullName', 'kind'];

  return positions.filter(position =>
    pathsToSearch.some(key => get(position, key)?.toLowerCase().includes(searchText)),
  );
};

const GuildPositions = () => {
  const { id: guildId } = useParams();
  const { data, loading } = useGuildPositionsQuery({ variables: { guildId } });
  const { data: members } = useGuildMembersIdsQuery({ variables: { guildId } });
  const guildPositionModal = useModalState<GuildPositionModalState>();
  const [search, setSearch] = useQueryParam('search', false);

  const positions = data?.guildPositions || [];
  const filteredPositionItems = filterPositions(positions, search);

  const { current = [], past = [] } = groupBy(filteredPositionItems, position => (position.to ? 'past' : 'current'));

  const guildMembers = members?.guildMembers ?? [];
  const currentUsersIds = guildMembers.map(({ user }) => user.id);
  const userIdToMemberIdMap = guildMembers.reduce((obj, { id, user }) => ({ ...obj, [user.id]: id }), {});

  const renderList = (title: string, dataSource: GuildPositionItem[]) => (
    <Card px={24}>
      <List
        header={<Title level={4}>{title}</Title>}
        loading={loading}
        dataSource={dataSource}
        rowKey="id"
        renderItem={position => (
          <GuildPosition {...position} openModal={guildPositionModal.open} closeModal={guildPositionModal.close} />
        )}
      />
    </Card>
  );

  return (
    <Spin spinning={loading} tip="Loading member actions">
      <FiltersCard search={search} onSearch={setSearch} openModal={guildPositionModal.open} />
      {!loading && (
        <Box maxWidth="100%" overflow="auto" p={24} pt={0}>
          {filteredPositionItems.length === 0 && (
            <EmptyPositions positionsCount={positions.length} openModal={guildPositionModal.open} />
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
          currentUsersIds={currentUsersIds}
          userIdToMemberIdMap={userIdToMemberIdMap}
          guildId={guildId}
        />
      )}
    </Spin>
  );
};

export default GuildPositions;
