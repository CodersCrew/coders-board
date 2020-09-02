import React from 'react';
import { useEffectOnce } from 'react-use';
import { List } from 'antd';

import { Box, Title } from '@/components/atoms';
import { Card, FiltersCard } from '@/components/molecules';
import { UseSquadMembers, useSquadMembers } from '@/graphql/squads';
import { useDataModal } from '@/services/modals';
import { groupBy } from '@/utils/arrays';

import { useSquadContext } from '../SquadContext';
import SquadMember from './SquadMember';
import { SquadMemberModal, SquadMemberModalData } from './SquadMemberModal';

type Member = UseSquadMembers['item'];

const SquadMembers = () => {
  const { squadId, squadRole } = useSquadContext();
  const squadMembers = useSquadMembers({ squadId, archived: true });
  const squadMemberModal = useDataModal<SquadMemberModalData>();

  useEffectOnce(() => {
    squadMembers.refetch();
  });

  const { current = [], past = [] } = groupBy(squadMembers.data, member => (member.deletedAt ? 'past' : 'current'));

  const renderList = (title: string, dataSource: Member[]) => (
    <Card px={24}>
      <List
        header={<Title level={4}>{title}</Title>}
        rowKey="id"
        loading={squadMembers.loading}
        dataSource={dataSource}
        renderItem={squadMember => <SquadMember member={squadMember} openSquadMemberModal={squadMemberModal.open} />}
      />
    </Card>
  );

  return (
    <>
      <FiltersCard
        addButton={squadRole.isManager && { label: 'Add member', onClick: () => squadMemberModal.open(null) }}
      />
      <Box maxWidth="100%" overflow="auto" mt={32}>
        {current.length > 0 && renderList('Current members', current)}
        {current.length > 0 && past.length > 0 && <Box height={24} />}
        {past.length > 0 && renderList('Past members', past)}
      </Box>
      <SquadMemberModal {...squadMemberModal} />
    </>
  );
};

export default SquadMembers;
