import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import { Box, Button, Spin } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { useSquadMembers } from '@/graphql/squads';
import { useModalState } from '@/hooks/useModalState';

import { useSquadContext } from '../SquadContext';
import { SquadMemberModal, SquadMemberModalProps } from './SquadMemberModal';
import { useSquadMembersColumns } from './useSquadMembersColumns';

const SquadMembers = () => {
  const { squadId, squadRole } = useSquadContext();
  const squadMembers = useSquadMembers({ squadId });
  const squadMemberModal = useModalState<SquadMemberModalProps['data']>();
  const columns = useSquadMembersColumns();

  return (
    <>
      {squadRole.isManager && (
        <Spin spinning={squadMembers.loading} tip="Loading member actions">
          <Box pb={24} display="flex">
            <Button icon={<PlusOutlined />} ml="auto" type="primary" onClick={() => squadMemberModal.open()}>
              Add member
            </Button>
          </Box>
        </Spin>
      )}
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
