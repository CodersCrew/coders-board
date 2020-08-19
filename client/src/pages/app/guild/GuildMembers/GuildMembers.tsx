import React from 'react';
import { CrownOutlined, DeleteOutlined } from '@ant-design/icons';

import { Box } from '@/components/atoms';
import { Card, FiltersCard, Table, TableActions } from '@/components/molecules';
import { UseGuildMembers, useGuildMembers } from '@/graphql/guilds';
import { useModalState } from '@/hooks/useModalState';
import { pick } from '@/utils/objects';

import { useGuildContext } from '../GuildContext';
import { GuildMemberModal, GuildMemberModalProps } from './GuildMemberModal';
import { useDeleteGuildMemberConfirm } from './useDeleteGuildMemberConfirm';
import { useGuildMembersColumns } from './useGuildMembersColumns';

type Member = UseGuildMembers['item'];

const GuildMembers = () => {
  const { guildId, guildRole } = useGuildContext();
  const guildMembers = useGuildMembers({ guildId });
  const guildMemberModal = useModalState<GuildMemberModalProps['data']>();
  const columns = useGuildMembersColumns();
  const deleteGuildMemberConfirm = useDeleteGuildMemberConfirm();

  const actions: TableActions<Member> = [
    {
      label: 'Change role',
      icon: CrownOutlined,
      onClick: member => {
        guildMemberModal.open({
          ...pick(member, ['id', 'role']),
          userId: member.user.id,
        });
      },
    },
    {
      label: 'Delete member',
      icon: DeleteOutlined,
      itemProps: { danger: true },
      onClick: member => deleteGuildMemberConfirm({ id: member.id, fullName: member.user.fullName }),
    },
  ];

  return (
    <>
      <FiltersCard
        addButton={guildRole.isManager && { label: 'Add member', onClick: () => guildMemberModal.open(null) }}
      />
      <Box maxWidth="100%" overflow="auto">
        <Card>
          <Table
            loading={guildMembers.loading}
            dataSource={guildMembers.data}
            columns={columns}
            actions={guildRole.isManager ? actions : []}
            pagination={false}
          />
        </Card>
      </Box>
      {guildMemberModal.isMounted && (
        <GuildMemberModal
          onCancel={guildMemberModal.close}
          visible={guildMemberModal.isVisible}
          data={guildMemberModal.data}
        />
      )}
    </>
  );
};

export default GuildMembers;
