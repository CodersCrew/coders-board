import React from 'react';
import { Avatar, Tag } from 'antd';

import { Box, Paragraph } from '@/components/atoms';
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
      title: 'Slack',
      dataIndex: 'slackId',
      visible: isAdmin,
      render: (_, { slackId }) => {
        return slackId ? <Tag color="success">Integrated</Tag> : <Tag color="error">Non-integrated</Tag>;
      },
    },
  ];

  return columns;
};
