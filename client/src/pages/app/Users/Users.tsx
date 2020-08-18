import React, { useState } from 'react';
import { Table } from 'antd';

import { Box } from '@/components/atoms';
import { Card, FiltersCard, Page } from '@/components/molecules';
import { RoleSelect } from '@/components/selects';
import { useAuthorizedUser, useUsers } from '@/graphql/users';
import { useModalState } from '@/hooks/useModalState';
import { useToggle } from '@/hooks/useToggle';
import { UserRole } from '@/typings/graphql';

import { AddUserModal } from './AddUserModal';
import { SyncSlackModal, SyncSlackModalProps } from './SyncSlackModal';
import { useUsersColumns } from './useUsersColumns';

const Users = () => {
  const userModalToggle = useToggle(false);
  const syncSlackModal = useModalState<SyncSlackModalProps['data']>();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<UserRole | undefined>();
  const { isAdmin } = useAuthorizedUser();
  const users = useUsers({ search, role });
  const columns = useUsersColumns({ openSyncSlackModal: syncSlackModal.open });

  const filtersLeftNode = (
    <RoleSelect
      loading={users.loading}
      placeholder="Select user role"
      onSelect={setRole}
      allowClear
      style={{ width: 240, marginLeft: 24 }}
    />
  );

  return (
    <Page>
      <Page.Header title="Users" subTitle="Search and filter for all of the CodersCrew users" />
      <Page.Content>
        <FiltersCard
          search={{ onSearch: setSearch, value: search, loading: users.loading }}
          addButton={isAdmin && { label: 'Add user', onClick: userModalToggle.setOn }}
          leftNode={filtersLeftNode}
        />
        <Box maxWidth="100%" overflow="auto" mt={32}>
          <Card>
            <Table
              loading={users.loading}
              dataSource={users.data}
              columns={columns}
              rowKey="id"
              size="small"
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Box>
      </Page.Content>
      <AddUserModal visible={userModalToggle.on} onCancel={userModalToggle.setOff} />
      {syncSlackModal.isMounted && (
        <SyncSlackModal onCancel={syncSlackModal.close} visible={syncSlackModal.isVisible} data={syncSlackModal.data} />
      )}
    </Page>
  );
};

export default Users;
