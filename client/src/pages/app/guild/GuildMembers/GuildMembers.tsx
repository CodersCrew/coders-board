import React from 'react';
import { Table } from 'antd';

import { Box } from '@/components/atoms';
import { Card, FiltersCard } from '@/components/molecules';
import { useGuildMembers } from '@/graphql/guilds';
import { useModalState } from '@/hooks/useModalState';

import { useGuildContext } from '../GuildContext';
import { GuildMemberModal, GuildMemberModalProps } from './GuildMemberModal';
import { useGuildMembersColumns } from './useGuildMembersColumns';

const GuildMembers = () => {
  const { guildId, guildRole } = useGuildContext();
  const columns = useGuildMembersColumns();
  const guildMembers = useGuildMembers({ guildId });
  const guildMemberModal = useModalState<GuildMemberModalProps['data']>();

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
            rowKey="id"
            size="small"
            pagination={false}
            scroll={{ x: 'max-content' }}
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
