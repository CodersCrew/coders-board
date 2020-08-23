import React from 'react';
import { Tooltip } from 'antd';

import { Avatar, AvatarGroup, Box, Paragraph } from '@/components/atoms';
import { SuccessUserFragment } from '@/graphql/successes/successes.apollo';

type SuccessFooterProps = {
  users: SuccessUserFragment[];
};

export const SuccessFooter = ({ users }: SuccessFooterProps) => {
  return (
    <Box mt={24}>
      <Paragraph mb={8} small strong>
        Main contributors of this success:
      </Paragraph>
      <AvatarGroup>
        {users.map(user => (
          <Tooltip key={user.id} title={user.fullName} placement="top">
            <Avatar src={user.thumbnail} />
          </Tooltip>
        ))}
      </AvatarGroup>
    </Box>
  );
};
