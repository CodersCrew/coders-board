import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Box, Paragraph, Tag } from '@/components/atoms';
import { TableColumns } from '@/components/molecules';
import { useAuthorizedUser, UseUsers } from '@/graphql/users';

type User = UseUsers['item'];

export const useUsersColumns = () => {
  const { isAdmin } = useAuthorizedUser();

  const columns: TableColumns<User> = [
    {
      title: 'Full name',
      dataIndex: 'firstName',
      width: 216,
      fixed: true,
      render: (_, { id, fullName, thumbnail }) => (
        <Link to={`/app/profile/${id}`}>
          <Box px={4} display="flex" alignItems="center">
            <Avatar size="small" src={thumbnail} />
            <Paragraph ml={12}>{fullName}</Paragraph>
          </Box>
        </Link>
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
      title: 'Slack',
      dataIndex: 'slackId',
      visible: isAdmin,
      render: (_, { slackId }) => {
        return slackId ? <Tag color="success">Integrated</Tag> : <Tag color="error">Non-integrated</Tag>;
      },
    },
    {
      title: 'Account status',
      dataIndex: 'deletedAt',
      visible: isAdmin,
      render: (_, { deletedAt }) => {
        return deletedAt ? <Tag color="red">Deleted</Tag> : <Tag color="green">Active</Tag>;
      },
    },
  ];

  return columns;
};
