// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { MoreOutlined, PartitionOutlined, PlusOutlined } from '@ant-design/icons';
// import { Avatar, Dropdown, Menu, Table, Tag } from 'antd';
// import { ColumnsType } from 'antd/lib/table';

// import { Box, Button, Icon, Paragraph, Spin } from '@/components/atoms';
// import { Card } from '@/components/molecules';
// import { useModalState } from '@/hooks/useModalState';
// import { TeamRole } from '@/typings/graphql';

// import { AddMemberModal } from './AddMemberModal';
// import { TeamMembersQuery, useTeamMembersQuery } from './TeamMembers.apollo';

// type Columns = ColumnsType<TeamMembersQuery['teamMembers'][number]>;

const TeamMembers = () => {
  return null;
  // const { id } = useParams();
  // const navigate = useNavigate();
  // // const { data, loading } = useTeamMembersQuery({ variables: { teamId: id } });
  // const addMemberModal = useModalState();

  // const menu = (userName: string) => (
  //   <Menu>
  //     <Menu.Item onClick={() => navigate(`../positions?search=${userName}`)} icon={<Icon icon={PartitionOutlined} />}>
  //       Manage positions
  //     </Menu.Item>
  //   </Menu>
  // );

  // const columns: Columns = [
  //   {
  //     title: 'Full name',
  //     key: 'fullname',
  //     width: 216,
  //     fixed: true,
  //     render: (_, { user: { firstName, lastName, image } }) => (
  //       <Box px={4} display="flex" alignItems="center">
  //         <Avatar size="small" src={image} />
  //         <Paragraph ml={12}>
  //           {firstName} {lastName}
  //         </Paragraph>
  //       </Box>
  //     ),
  //   },
  //   {
  //     title: 'Role',
  //     key: 'role',
  //     render: (_, { role }) => {
  //       if (role === TeamRole.Owner) return <Tag color="geekblue">Owner</Tag>;
  //       if (role === TeamRole.Manager) return <Tag color="blue">Manager</Tag>;

  //       return <Tag color="cyan">Member</Tag>;
  //     },
  //   },
  //   {
  //     title: 'Position',
  //     key: 'position',
  //     render: (_, { positions }) => {
  //       return positions
  //         .filter(({ to }) => !to)
  //         .map(({ position }) => position.name)
  //         .join(', ');
  //     },
  //   },
  //   {
  //     align: 'right',
  //     fixed: 'right',
  //     render: (_, { user }) => {
  //       return (
  //         <Dropdown overlay={menu(`${user.firstName} ${user.lastName}`)} trigger={['click']}>
  //           <Button type="link" icon={<Icon icon={MoreOutlined} color="text.secondary" />} />
  //         </Dropdown>
  //       );
  //     },
  //   },
  // ];

  // const dataSource = data?.teamMembers || [];

  // const currentMembersIds = dataSource.map(({ user }) => user.id);

  // return (
  //   <>
  //     <Spin spinning={loading} tip="Loading member actions">
  //       <Box p={24} display="flex">
  //         <Button icon={<PlusOutlined />} ml="auto" type="primary" onClick={addMemberModal.open}>
  //           Add member
  //         </Button>
  //       </Box>
  //     </Spin>
  //     <Box maxWidth="100%" overflow="auto" p={24} pt={0}>
  //       <Card>
  //         <Table
  //           loading={loading}
  //           dataSource={dataSource}
  //           columns={columns}
  //           rowKey="id"
  //           size="small"
  //           pagination={false}
  //           scroll={{ x: 'max-content' }}
  //         />
  //       </Card>
  //     </Box>
  //     {addMemberModal.isMounted && (
  //       <AddMemberModal
  //         teamId={id}
  //         onCancel={addMemberModal.close}
  //         visible={addMemberModal.isVisible}
  //         currentMembersIds={currentMembersIds}
  //       />
  //     )}
  //   </>
  // );
};

export default TeamMembers;
