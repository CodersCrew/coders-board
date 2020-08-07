import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useGuildPositions } from '@/graphql/guilds';
import { GuildPositionKind } from '@/typings/graphql';
import { getBasicMessages } from '@/utils/getBasicMessages';
import { parseGuildPositionKind } from '@/utils/platform';

type Params = {
  kind: GuildPositionKind;
  id: string;
  guildId: string;
};

export const useDeleteGuildPositionConfirm = ({ kind, id, guildId }: Params) => {
  const { colors } = useTheme();
  const guildPositions = useGuildPositions();

  const messages = getBasicMessages('team position', 'delete');

  return () => {
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
          await guildPositions.delete({ variables: { id, guildId } });
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
  };
};
