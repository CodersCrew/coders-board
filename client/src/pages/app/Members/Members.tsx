import React, { useState } from 'react';
import { Table } from 'antd';

import { Box } from '@/components/atoms';
import { Card, FiltersCard, Page } from '@/components/molecules';
import { RoleSelect } from '@/components/selects';
import { useAuthorizedUser, useUsers } from '@/graphql/users';
import { useToggle } from '@/hooks/useToggle';
import { UserRole } from '@/typings/graphql';

import { AddMemberModal } from './AddMemberModal';
import { useMembersColumns } from './useMembersColumns';

const Members = () => {
  const memberModalToggle = useToggle(false);
  const [search, setSearch] = useState('');
  const { isAdmin } = useAuthorizedUser();
  const [role, setRole] = useState<UserRole | undefined>();
  const users = useUsers({ search, role });
  const columns = useMembersColumns();

  const filtersLeftNode = (
    <RoleSelect
      loading={users.loading}
      placeholder="Select member role"
      onSelect={setRole}
      allowClear
      style={{ width: 240, marginLeft: 24 }}
    />
  );

  return (
    <Page>
      <Page.Header title="Members" subTitle="Search and filter for all of the CodersCrew members" />
      <Page.Content>
        <FiltersCard
          search={{ onSearch: setSearch, value: search, loading: users.loading }}
          addButton={isAdmin && { label: 'Add member', onClick: memberModalToggle.setOn }}
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
      <AddMemberModal visible={memberModalToggle.on} onCancel={memberModalToggle.setOff} />
    </Page>
  );
};

export default Members;
