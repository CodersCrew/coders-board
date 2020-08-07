import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';

import { Icon } from '@/components/atoms';
import { confirmModal } from '@/components/molecules';
import { useSquadMembers } from '@/graphql/squads';
import { getBasicMessages } from '@/utils/getBasicMessages';

type Params = {
  fullName: string;
  id: string;
};

export const useDeleteSquadMemberConfirm = (squadId: string) => {
  const theme = useTheme();
  const squadMembers = useSquadMembers();

  const messages = getBasicMessages('member', 'delete');

  return ({ fullName, id }: Params) => {
    confirmModal({
      title: 'Are you sure?',
      content: `Are you sure you want to delete squad member "${fullName}"? This operation will be permanent and cannot be undone.`,
      okText: 'Yes, delete member',
      cancelText: 'No, preserve member',
      width: 440,
      onOk: async () => {
        try {
          messages.loading();
          await squadMembers.delete({ variables: { id, squadId } });
          messages.success();
        } catch ({ graphQLErrors }) {
          messages.failure(graphQLErrors[0].message);
        }
      },
      okButtonProps: { danger: true },
      icon: <Icon icon={DeleteOutlined} color={theme.colors.error.main} />,
      autoFocusButton: null,
    });
  };
};
