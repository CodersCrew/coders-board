import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useGuildPositionMutations } from '@/graphql/guilds';
import { runMutation } from '@/services/graphql';
import { getGenericMessages } from '@/utils/getGenericMessages';

import { useGuildContext } from '../GuildContext';

type Params = {
  positionName: string;
  id: string;
};

export const useDeleteGuildPositionConfirm = ({ positionName, id }: Params) => {
  const { colors } = useTheme();
  const { deleteGuildPosition } = useGuildPositionMutations();
  const { guildId } = useGuildContext();

  return () => {
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete user position "${positionName}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete position',
      cancelText: 'No, preserve position',
      width: 440,
      onOk: () =>
        runMutation({
          mutation: deleteGuildPosition({ id, guildId }),
          messages: getGenericMessages('team position', 'delete'),
        }),
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={colors.error.main} />,
      autoFocusButton: null,
    });
  };
};
