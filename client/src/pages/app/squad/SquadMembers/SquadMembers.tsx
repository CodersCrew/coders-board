import React from 'react';
import { CrownOutlined, DeleteOutlined } from '@ant-design/icons';

import { Box } from '@/components/atoms';
import { Card, FiltersCard, Table, TableActions } from '@/components/molecules';
import { UseSquadMembers, useSquadMembers } from '@/graphql/squads';
import { useModalState } from '@/hooks/useModalState';
import { pick } from '@/utils/objects';

import { useSquadContext } from '../SquadContext';
import { SquadMemberModal, SquadMemberModalProps } from './SquadMemberModal';
import { useDeleteSquadMemberConfirm } from './useDeleteSquadMemberConfirm';
import { useSquadMembersColumns } from './useSquadMembersColumns';

type Member = UseSquadMembers['item'];

const SquadMembers = () => {
  const { squadId, squadRole } = useSquadContext();
  const squadMembers = useSquadMembers({ squadId });
  const squadMemberModal = useModalState<SquadMemberModalProps['data']>();
  const columns = useSquadMembersColumns();
  const deleteSquadMemberConfirm = useDeleteSquadMemberConfirm();

  const actions: TableActions<Member> = [
    {
      label: 'Change role',
      icon: CrownOutlined,
      onClick: member => {
        squadMemberModal.open({
          ...pick(member, ['id', 'role']),
          userId: member.user.id,
        });
      },
    },
    {
      label: 'Delete member',
      icon: DeleteOutlined,
      itemProps: { danger: true },
      onClick: member => deleteSquadMemberConfirm({ id: member.id, fullName: member.user.fullName }),
    },
  ];

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
            actions={squadRole.isManager ? actions : []}
            pagination={false}
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
