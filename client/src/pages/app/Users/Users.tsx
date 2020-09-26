import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined, SlackOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { Box, Checkbox } from '@/components/atoms';
import { Card, FiltersCard, Page, Table, TableActions } from '@/components/molecules';
import { RoleSelect } from '@/components/selects';
import { useAuthorizedUser, UseUsers, useUsers } from '@/graphql/users';
import { useToggle } from '@/hooks/useToggle';
import { useDataModal } from '@/services/modals';
import { UserRole } from '@/typings/graphql';
import { pick } from '@/utils/objects';

import { SyncSlackModal, SyncSlackModalData } from './SyncSlackModal';
import { useDeleteUserConfirm } from './useDeleteUserConfirm';
import { UserModal, UserModalData } from './UserModal';
import { useUsersColumns } from './useUsersColumns';

type User = UseUsers['item'];

const Users = () => {
  const userModal = useDataModal<UserModalData>();
  const syncSlackModal = useDataModal<SyncSlackModalData>();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<UserRole | undefined>();
  const { on: withDeleted, toggle: toggleWithDeleted } = useToggle();
  const { isAdmin } = useAuthorizedUser();
  const deleteUserConfirm = useDeleteUserConfirm();
  const users = useUsers({ search, role, withDeleted });
  const columns = useUsersColumns();

  const filtersLeftNode = (
    <Box display="flex" alignItems="center">
      <RoleSelect
        loading={users.loading}
        placeholder="Member role"
        onChange={setRole}
        allowClear
        style={{ width: 240, marginLeft: 24 }}
      />
      <Checkbox ml={16} checked={withDeleted} onChange={toggleWithDeleted}>
        With deleted
      </Checkbox>
    </Box>
  );

  const pageHeaderExtra = isAdmin
    ? [
        <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => userModal.open(null)}>
          Add member
        </Button>,
      ]
    : null;

  const actions: TableActions<User> = [
    {
      label: 'Sync with Slack',
      icon: SlackOutlined,
      visible: user => !user.slackId,
      onClick: user => syncSlackModal.open({ userId: user.id }),
    },
    {
      label: 'Edit member',
      icon: EditOutlined,
      onClick: user => userModal.open(pick(user, ['id', 'firstName', 'lastName', 'primaryEmail', 'recoveryEmail'])),
    },
    {
      label: 'Remove member',
      icon: DeleteOutlined,
      onClick: user => deleteUserConfirm(pick(user, ['id', 'fullName'])),
      itemProps: { danger: true },
    },
  ];

  return (
    <Page>
      <Page.Header
        title="Members"
        subTitle="Search and filter for all of the CodersCrew members"
        extra={pageHeaderExtra}
      />
      <Page.Content>
        <FiltersCard
          search={{ onSearch: setSearch, value: search, loading: users.loading }}
          leftNode={filtersLeftNode}
        />
        <Box maxWidth="100%" overflow="auto" mt={32}>
          <Card>
            <Table loading={users.loading} dataSource={users.data} columns={columns} actions={isAdmin ? actions : []} />
          </Card>
        </Box>
      </Page.Content>
      <UserModal {...userModal} />
      <SyncSlackModal {...syncSlackModal} />
    </Page>
  );
};

export default Users;
