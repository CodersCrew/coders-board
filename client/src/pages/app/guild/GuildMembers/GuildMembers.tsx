import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CrownOutlined, PartitionOutlined } from '@ant-design/icons';

import { Box } from '@/components/atoms';
import { Card, FiltersCard, Table, TableActions } from '@/components/molecules';
import { UseGuildMembers, useGuildMembers } from '@/graphql/guilds';
import { useDataModal, useSimpleModal } from '@/services/modals';
import { pick } from '@/utils/objects';

import { useGuildContext } from '../GuildContext';
import { CreateGuildMemberModal } from './CreateGuildMemberModal';
import { UpdateGuildMemberModal, UpdateGuildMemberModalData } from './UpdateGuildMemberModal';
import { useGuildMembersColumns } from './useGuildMembersColumns';

type Member = UseGuildMembers['item'];

const GuildMembers = () => {
  const navigate = useNavigate();
  const { guildId, guildRole } = useGuildContext();
  const guildMembers = useGuildMembers({ guildId });
  const createGuildMemberModal = useSimpleModal();
  const updateGuildMemberModal = useDataModal<UpdateGuildMemberModalData>();
  const columns = useGuildMembersColumns();

  const actions: TableActions<Member> = guildRole.isOwner
    ? [
        {
          label: 'Change role',
          icon: CrownOutlined,
          onClick: member => {
            updateGuildMemberModal.open({
              ...pick(member, ['id', 'role']),
              userId: member.user.id,
            });
          },
        },
        {
          label: 'Manage positions',
          icon: PartitionOutlined,
          visible: member => Boolean(member.activePositions.length),
          onClick: member => navigate(`../positions?search=${encodeURI(member.user.fullName)}`),
        },
      ]
    : [];

  return (
    <>
      <FiltersCard
        addButton={guildRole.isManager && { label: 'Add member', onClick: () => createGuildMemberModal.open() }}
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
      <CreateGuildMemberModal {...createGuildMemberModal} />
      <UpdateGuildMemberModal {...updateGuildMemberModal} />
    </>
  );
};

export default GuildMembers;
