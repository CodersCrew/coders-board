import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { GraphQLOperations, GuildPositionKind } from '@/typings/graphql';
import { getBasicMessages } from '@/utils/getBasicMessages';
import { parseGuildPositionKind } from '@/utils/platform';

import { useDeleteGuildPositionMutation } from './GuildPosition.apollo';

type Params = {
  kind: GuildPositionKind;
  id: string;
};

export const useDeleteGuildPositionConfirm = ({ kind, id }: Params) => {
  const { colors } = useTheme();
  const [deletePosition] = useDeleteGuildPositionMutation({
    refetchQueries: [GraphQLOperations.Query.guildMembers, GraphQLOperations.Query.guildPositions],
  });

  const messages = getBasicMessages('team position', 'delete');

  return {
    deleteGuildPositionConfirm: () => {
      const position = parseGuildPositionKind(kind);

      confirmModal({
        title: 'Are you sure?',
        content: `Are you sure you want to delete user position "${position}"? This operation will be permanent and cannot be undone.`,
        okText: 'Yes, delete position',
        cancelText: 'No, preserve position',
        width: 440,
        onOk: async () => {
          try {
            messages.loading();
            await deletePosition({ variables: { id } });
            messages.success();
          } catch (ex) {
            console.log(ex);
            messages.failure();
          }
        },
        okButtonProps: { danger: true },
        icon: <Icon icon={DeleteOutlined} color={colors.error.main} />,
        autoFocusButton: null,
      });
    },
  };
};
