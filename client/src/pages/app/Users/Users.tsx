import React, { useState } from 'react';
import { DeleteOutlined, SlackOutlined } from '@ant-design/icons';

import { Box } from '@/components/atoms';
import { Card, FiltersCard, Page, Table, TableActions } from '@/components/molecules';
import { RoleSelect } from '@/components/selects';
import { useAuthorizedUser, UseUsers, useUsers } from '@/graphql/users';
import { useModalState } from '@/hooks/useModalState';
import { useToggle } from '@/hooks/useToggle';
import { UserRole } from '@/typings/graphql';

import { AddUserModal } from './AddUserModal';
import { SyncSlackModal, SyncSlackModalProps } from './SyncSlackModal';
import { useUsersColumns } from './useUsersColumns';

type User = UseUsers['item'];

const Users = () => {
  const userModalToggle = useToggle(false);
  const syncSlackModal = useModalState<SyncSlackModalProps['data']>();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<UserRole | undefined>();
  const { isAdmin } = useAuthorizedUser();
  const users = useUsers({ search, role });
  const columns = useUsersColumns();

  const filtersLeftNode = (
    <RoleSelect
      loading={users.loading}
      placeholder="Select user role"
      onSelect={setRole}
      allowClear
      style={{ width: 240, marginLeft: 24 }}
    />
  );

  const actions: TableActions<User> = [
    {
      label: 'Sync with Slack',
      icon: SlackOutlined,
      visible: user => !user.slackId,
      onClick: user => syncSlackModal.open({ userId: user.id }),
    },
    {
      label: 'Remove user',
      icon: DeleteOutlined,
      onClick: () => console.log('delete'),
    },
  ];

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
            <Table loading={users.loading} dataSource={users.data} columns={columns} actions={isAdmin ? actions : []} />
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
