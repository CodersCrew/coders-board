import React, { useState } from 'react';
import { DeleteOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Input, Menu, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { Box, Button, Icon, Paragraph } from '@/components/atoms';
import { Card, Page } from '@/components/molecules';
import { RoleSelect } from '@/components/selects';
import { UseUsers, useUsers } from '@/graphql/users';
import { useToggle } from '@/hooks/useToggle';
import { UserRole } from '@/typings/graphql';

import { AddMemberModal } from './AddMemberModal';

type Member = UseUsers['item'];
type Columns = ColumnsType<Member>;

const Members = () => {
  const memberModalToggle = useToggle(false);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<UserRole | undefined>();
  const users = useUsers({ search, role });

  const menu = (
    <Menu>
      <Menu.Item danger icon={<Icon icon={DeleteOutlined} />}>
        Remove member
      </Menu.Item>
    </Menu>
  );

  const columns: Columns = [
    {
      title: 'Full name',
      dataIndex: 'firstName',
      width: 216,
      fixed: true,
      render: (_, { firstName, lastName, image }) => (
        <Box px={4} display="flex" alignItems="center">
          <Avatar size="small" src={image} />
          <Paragraph ml={12}>
            {firstName} {lastName}
          </Paragraph>
        </Box>
      ),
    },
    {
      title: 'CodersCrew email',
      dataIndex: 'primaryEmail',
      width: 280,
    },
    {
      title: 'Private email',
      dataIndex: 'recoveryEmail',
      width: 280,
    },
    {
      align: 'right',
      fixed: 'right',
      render: () => {
        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="link" icon={<Icon icon={MoreOutlined} color="text.secondary" />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Page>
      <Page.Header title="Members" subTitle="Search and filter for all of the CodersCrew members" />
      <Page.Content>
        <Card p={24} display="flex">
          <Box width={240}>
            <Input.Search placeholder="Search for members..." loading={users.loading} onSearch={setSearch} />
          </Box>
          <RoleSelect
            loading={users.loading}
            placeholder="Select member role"
            onSelect={setRole}
            allowClear
            style={{ width: 240, marginLeft: 24 }}
          />
          <Button icon={<PlusOutlined />} ml="auto" type="primary" onClick={memberModalToggle.setOn}>
            Add member
          </Button>
        </Card>
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
