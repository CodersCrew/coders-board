import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import { Box, Button, Spin } from '@/components/atoms';
import { Card } from '@/components/molecules';
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
      {guildRole.isManager && (
        <Spin spinning={guildMembers.loading} tip="Loading member actions">
          <Box display="flex" pb={24}>
            <Button icon={<PlusOutlined />} ml="auto" type="primary" onClick={() => guildMemberModal.open()}>
              Add member
            </Button>
          </Box>
        </Spin>
      )}
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
