import React from 'react';
import { useEffectOnce } from 'react-use';
import { List } from 'antd';

import { Box, Title } from '@/components/atoms';
import { Card, FiltersCard } from '@/components/molecules';
import { UseSquadMembers, useSquadMembers } from '@/graphql/squads';
import { useDataModal, useSimpleModal } from '@/services/modals';
import { groupBy } from '@/utils/arrays';

import { useSquadContext } from '../SquadContext';
import { CreateSquadMemberModal } from './CreateSquadMemberModal';
import SquadMember from './SquadMember';
import { UpdateSquadMemberModal, UpdateSquadMemberModalData } from './UpdateSquadMemberModal';

type Member = UseSquadMembers['item'];

const SquadMembers = () => {
  const { squadId, squadRole } = useSquadContext();
  const squadMembers = useSquadMembers({ squadId, archived: true });
  const createSquadMemberModal = useSimpleModal();
  const updateSquadMemberModal = useDataModal<UpdateSquadMemberModalData>();

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
        renderItem={squadMember => (
          <SquadMember member={squadMember} openSquadMemberModal={updateSquadMemberModal.open} />
        )}
      />
    </Card>
  );

  return (
    <>
      <FiltersCard
        addButton={{ label: 'Add member', visible: squadRole.isManager, onClick: () => createSquadMemberModal.open() }}
      />
      <Box maxWidth="100%" overflow="auto" mt={32}>
        {current.length > 0 && renderList('Current members', current)}
        {current.length > 0 && past.length > 0 && <Box height={24} />}
        {past.length > 0 && renderList('Past members', past)}
      </Box>
      <CreateSquadMemberModal {...createSquadMemberModal} />
      <UpdateSquadMemberModal {...updateSquadMemberModal} />
    </>
  );
};

export default SquadMembers;
