import React from 'react';
import { Table } from 'antd';

import { Box } from '@/components/atoms';
import { Card, FiltersCard } from '@/components/molecules';
import { useSquadMembers } from '@/graphql/squads';
import { useModalState } from '@/hooks/useModalState';

import { useSquadContext } from '../SquadContext';
import { SquadMemberModal, SquadMemberModalProps } from './SquadMemberModal';
import { useSquadMembersColumns } from './useSquadMembersColumns';

const SquadMembers = () => {
  const { squadId, squadRole } = useSquadContext();
  const squadMembers = useSquadMembers({ squadId });
  const squadMemberModal = useModalState<SquadMemberModalProps['data']>();
  const columns = useSquadMembersColumns({ openModal: squadMemberModal.open });

  return (
    <>
      <FiltersCard
        addButton={squadRole.isManager && { label: 'Add member', onClick: () => squadMemberModal.open(null) }}
      />
      <Box maxWidth="100%" overflow="auto">
        <Card>
          <Table
            loading={squadMembers.loading}
            dataSource={squadMembers.data}
            columns={columns}
            rowKey="id"
            size="small"
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </Box>
      {squadMemberModal.isMounted && (
        <SquadMemberModal
          onCancel={squadMemberModal.close}
          visible={squadMemberModal.isVisible}
          data={squadMemberModal.data}
        />
      )}
    </>
  );
};

export default SquadMembers;
