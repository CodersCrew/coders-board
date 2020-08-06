import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { GraphQLOperations } from '@/typings/graphql';
import { getBasicMessages } from '@/utils/getBasicMessages';

import { useDeleteGuildMemberMutation } from './GuildMembers.apollo';

type Params = {
  fullName: string;
  id: string;
};

export const useDeleteGuildMemberConfirm = () => {
  const { colors } = useTheme();
  const [deletePosition] = useDeleteGuildMemberMutation({
    refetchQueries: [GraphQLOperations.Query.guildMembers],
  });

  const messages = getBasicMessages('member', 'delete');

  return {
    deleteGuildMemberConfirm: ({ fullName, id }: Params) => {
      confirmModal({
        title: 'Are you sure?',
        content: `Are you sure you want to delete guild member "${fullName}"? This operation will be permanent and cannot be undone.`,
        okText: 'Yes, delete member',
        cancelText: 'No, preserve member',
        width: 440,
        onOk: async () => {
          try {
            messages.loading();
            await deletePosition({ variables: { id } });
            messages.success();
          } catch ({ graphQLErrors }) {
            messages.failure(graphQLErrors[0].message);
          }
        },
        okButtonProps: { danger: true },
        icon: <Icon icon={DeleteOutlined} color={colors.error.main} />,
        autoFocusButton: null,
      });
    },
  };
};
