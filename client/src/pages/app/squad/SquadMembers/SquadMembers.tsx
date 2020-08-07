import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CrownOutlined, DeleteOutlined, MoreOutlined, PartitionOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { Box, Button, Icon, Paragraph, Spin } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { UseSquadMembers, useSquadMembers } from '@/graphql/squads';
import { useModalState } from '@/hooks/useModalState';
import { TeamRole } from '@/typings/graphql';

import { SquadMemberModal, SquadMemberModalProps } from './SquadMemberModal';
import { useDeleteSquadMemberConfirm } from './useDeleteSquadMemberConfirm';

type Member = UseSquadMembers['item'];
type Columns = ColumnsType<Member>;

const SquadMembers = () => {
  const params = useParams();
  const navigate = useNavigate();
  const deleteSquadMemberConfirm = useDeleteSquadMemberConfirm(params.id);
  const squadMembers = useSquadMembers({ squadId: params.id });
  const squadMemberModal = useModalState<SquadMemberModalProps['data']>();

  const menu = (member: Member) => (
    <Menu>
      <Menu.Item
        onClick={() => navigate(`../positions?search=${member.user.fullName}`)}
        icon={<Icon icon={PartitionOutlined} />}
      >
        Manage positions
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          squadMemberModal.open({
            id: member.id,
            role: member.role,
            userId: member.user.id,
          })
        }
        icon={<Icon icon={CrownOutlined} />}
      >
        Change role
      </Menu.Item>
      <Menu.Item
        danger
        onClick={() => deleteSquadMemberConfirm({ id: member.id, fullName: member.user.fullName })}
        icon={<Icon icon={DeleteOutlined} />}
      >
        Delete member
      </Menu.Item>
    </Menu>
  );

  const columns: Columns = [
    {
      title: 'Full name',
      key: 'fullname',
      width: 216,
      fixed: true,
      render: (_, { user: { fullName, image } }) => (
        <Box px={4} display="flex" alignItems="center">
          <Avatar size="small" src={image} />
          <Paragraph ml={12}>{fullName}</Paragraph>
        </Box>
      ),
    },
    {
      title: 'Role',
      key: 'role',
      render: (_, { role }) => {
        if (role === TeamRole.Owner) return <Tag color="geekblue">Owner</Tag>;
        if (role === TeamRole.Manager) return <Tag color="blue">Manager</Tag>;

        return <Tag color="cyan">Member</Tag>;
      },
    },
    {
      title: 'Position',
      key: 'position',
      render: (_, { positions }) => {
        console.log(positions);
        return positions
          .map(({ chapter, position: { name: positionName } }) => {
            return chapter ? `${positionName} in ${chapter.name} Chapter` : positionName;
          })
          .join(', ');
      },
    },
    {
      align: 'right',
      fixed: 'right',
      render: (_, member) => {
        return (
          <Dropdown overlay={menu(member)} trigger={['click']}>
            <Button type="link" icon={<Icon icon={MoreOutlined} color="text.secondary" />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <Spin spinning={squadMembers.loading} tip="Loading member actions">
        <Box p={24} display="flex">
          <Button icon={<PlusOutlined />} ml="auto" type="primary" onClick={() => squadMemberModal.open()}>
            Add member
          </Button>
        </Box>
      </Spin>
      <Box maxWidth="100%" overflow="auto" p={24} pt={0}>
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
          squadId={params.id}
          onCancel={squadMemberModal.close}
          visible={squadMemberModal.isVisible}
          data={squadMemberModal.data}
        />
      )}
    </>
  );
};

export default SquadMembers;
