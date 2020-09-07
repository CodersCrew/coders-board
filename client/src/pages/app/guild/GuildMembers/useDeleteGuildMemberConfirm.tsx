import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useGuildMemberMutations } from '@/graphql/guilds';
import { runMutation } from '@/services/graphql';
import { getGenericMessages } from '@/utils/getGenericMessages';

import { useGuildContext } from '../GuildContext';

type Params = {
  fullName: string;
  id: string;
};

export const useDeleteGuildMemberConfirm = () => {
  const { colors } = useTheme();
  const { deleteGuildMember } = useGuildMemberMutations();
  const { guildId } = useGuildContext();

  return ({ fullName, id }: Params) => {
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete guild member "${fullName}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete member',
      cancelText: 'No, preserve member',
      width: 440,
      onOk: () =>
        runMutation({
          mutation: deleteGuildMember({ id, guildId }),
          messages: {
            ...getGenericMessages('member', 'delete'),
            failure: ({ graphQLErrors }) => graphQLErrors[0].message,
          },
        }),
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={colors.error.main} />,
      autoFocusButton: null,
    });
  };
};
