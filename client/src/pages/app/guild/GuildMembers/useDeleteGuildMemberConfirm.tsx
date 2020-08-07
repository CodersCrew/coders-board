import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useGuildMembers } from '@/graphql/guilds';
import { getBasicMessages } from '@/utils/getBasicMessages';

type Params = {
  fullName: string;
  id: string;
};

export const useDeleteGuildMemberConfirm = (guildId: string) => {
  const { colors } = useTheme();
  const guildMembers = useGuildMembers();

  const messages = getBasicMessages('member', 'delete');

  return ({ fullName, id }: Params) => {
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete guild member "${fullName}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete member',
      cancelText: 'No, preserve member',
      width: 440,
      onOk: async () => {
        try {
          messages.loading();
          await guildMembers.delete({ variables: { id, guildId } });
          messages.success();
        } catch ({ graphQLErrors }) {
          messages.failure(graphQLErrors[0].message);
        }
      },
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={colors.error.main} />,
      autoFocusButton: null,
    });
  };
};
